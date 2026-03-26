import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-long-random-secret-change-this-in-prod';

// In-memory user store (replace with Supabase/DB later)
const users: any[] = [
  {
    id: '1',
    email: 'admin@test.com',
    password: '$2b$10$5GxsHargls9oXfzAyJBIk.G06nxX92910tnQFSgrV5rYOEcjSlSRu', // bcrypt hash of "password"
    name: 'Demo User'
  }
];

// Simple login (email + password)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

// Optional: Register route (for future)
router.post('/register', async (req, res) => {
  // Add registration logic here later
  res.status(501).json({ message: 'Not implemented yet' });
});

export { router as authRouter };