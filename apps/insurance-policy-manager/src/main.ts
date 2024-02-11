/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import './config/auth.config';

import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import * as path from 'path';

import { authRouter } from './routes/auth.route';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('combined'));

app.use(
  session({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(authRouter);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to insurance-policy-manager!' });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(400).send(err.message);
});

app
  .listen(port, host, () => {
    console.log(`Listening at http://${host}:${port}/api`);
  })
  .on('error', console.error);
