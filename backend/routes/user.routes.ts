import { Hono } from 'hono';
import type { Context } from 'hono';
import * as userService from '../services/userService.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const userRoutes = new Hono();
userRoutes.use('*', authMiddleware);

userRoutes.get('/', async (c: Context) => {
  const users = await userService.getAllUsers();
  return c.json(users);
});

userRoutes.get('/profile', async (c: Context) => {
  const userId = c.get('userId');
  const user = await userService.getUserById(userId);
  return c.json(user);
});

userRoutes.patch('/profile', async (c: Context) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const user = await userService.updateUser(userId, body);
  return c.json(user);
});

userRoutes.post('/lock-savings', async (c: Context) => {
  const userId = c.get('userId');
  const { durationDays } = await c.req.json();
  const until = new Date();
  until.setDate(until.getDate() + durationDays);
  const user = await userService.updateUser(userId, { savingsLockedUntil: until.toISOString() });
  return c.json(user);
});

export default userRoutes;
