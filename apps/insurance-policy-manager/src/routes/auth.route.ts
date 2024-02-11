import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post(
  '/api/auth/signup',
  passport.authenticate('signup', {
    successRedirect: '/api',
  })
);

router.post(
  '/api/auth/signin',
  passport.authenticate('local', {
    successRedirect: '/api',
  })
);

export const authRouter = router;
