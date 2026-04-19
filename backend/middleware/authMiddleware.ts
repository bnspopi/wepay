import type { Context, Next } from 'hono';
import { verifyAccessToken } from '../services/tokenService.ts';

export async function authMiddleware(c: Context, next: Next) {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ message: 'No authorization token provided' }, 401);
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return c.json({ message: 'Invalid authorization header format' }, 401);
    }
    const payload = verifyAccessToken(parts[1]);
    c.set('userId', payload.userId);
    c.set('userEmail', payload.email);
    await next();
  } catch (error) {
    return c.json({ message: 'Invalid or expired token' }, 401);
  }
}

export async function optionalAuthMiddleware(c: Context, next: Next) {
  try {
    const authHeader = c.req.header('Authorization');
    if (authHeader) {
      const parts = authHeader.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        const payload = verifyAccessToken(parts[1]);
        c.set('userId', payload.userId);
        c.set('userEmail', payload.email);
      }
    }
  } catch {}
  await next();
}
