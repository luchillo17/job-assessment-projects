import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { mongoClientPromise } from './db.config';
import { User } from '../models/user.model';
import { MongoServerError } from 'mongodb';
import { RequestHandler } from 'express';

const signupStrategy = new LocalStrategy(async function verify(
  username,
  password,
  done
) {
  try {
    const client = await mongoClientPromise;

    const user = await client
      .db()
      .collection<User>('User')
      .insertOne({ username, password: await bcrypt.hash(password, 10) }, {});

    if (user.acknowledged) {
      return done(null, { username });
    } else {
      return done(null, false);
    }
  } catch (error) {
    if (error instanceof MongoServerError) {
      return done(null, false);
    }

    return done(error, false);
  }
});

const localStrategy = new LocalStrategy(async function verify(
  username,
  password,
  done
) {
  try {
    const client = await mongoClientPromise;

    const user = await client
      .db()
      .collection<User>('User')
      .findOne({ username });

    if (!user) {
      return done(null, false);
    }

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (!isSamePassword) {
      return done(null, false);
    }

    return done(null, { username });
  } catch (error) {
    return done(error, false);
  }
});

passport.use('signup', signupStrategy);
passport.use(localStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: User, done) => {
  done(null, user);
});

export const isAuthenticatedMiddleware: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.sendStatus(401);
};
