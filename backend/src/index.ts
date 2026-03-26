// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import passport from 'passport';

import { authRouter } from './routes/auth';
import { repurposeRouter } from './routes/repurpose';

// Load passport config (JWT strategy only)
import './config/passport';

dotenv.config();

const app = express();

app.use(helmet());
app.use(
   cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true
   })
);
app.use(express.json());

// ← IMPORTANT: Do NOT apply passport globally here

// Public routes (no auth required)
app.use('/auth', authRouter); // Login, register, etc.

// Protected routes (JWT required)
app.use(
   '/repurpose',
   //passport.authenticate('jwt', { session: false }),
   repurposeRouter
);

app.get('/health', (_, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Backend running on http://localhost:${PORT}`);
});
