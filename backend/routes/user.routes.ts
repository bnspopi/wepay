import { Hono } from 'hono';
import * as userService from '../services/userService.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import catchAsync from '../utils/catchAsync.ts';

const userRoutes = new Hono();

userRoutes.use('*', authMiddleware);

userRoutes.get('/', catchAsync(async (c) => {
    const users = await userService.getAllUsers();
    return c.json(users);
}));

userRoutes.get('/profile', catchAsync(async (c) => {
    const userId = c.get('userId');
    const user = await userService.getUserById(userId);
    return c.json(user);
}));

userRoutes.patch('/profile', catchAsync(async (c) => {
    const userId = c.get('userId');
    const body = await c.req.json();
    const user = await userService.updateUser(userId, body);
    return c.json(user);
}));

userRoutes.post('/lock-savings', catchAsync(async (c) => {
    const userId = c.get('userId');
    const { durationDays } = await c.req.json();
    const until = new Date();
    until.setDate(until.getDate() + durationDays);
    const user = await userService.updateUser(userId, { savingsLockedUntil: until.toISOString() });
    return c.json(user);
}));

export default userRoutes;
