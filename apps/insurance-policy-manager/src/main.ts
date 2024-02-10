/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import * as path from 'path';

import { authMiddleware } from './config/auth.config';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/auth/*', authMiddleware);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to insurance-policy-manager!' });
});

app
  .listen(port, host, () => {
    console.log(`Listening at http://${host}:${port}/api`);
  })
  .on('error', console.error);
