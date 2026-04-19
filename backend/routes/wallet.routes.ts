import { Hono } from 'hono';
import type { Context } from 'hono';
import { authMiddleware } from '../middleware/authMiddleware.ts';
import * as walletService from '../services/wallet.service.ts';

const walletRoutes = new Hono();
walletRoutes.use('*', authMiddleware);

walletRoutes.get('/balance', async (c: Context) => {
  const userId = c.get('userId');
  const balance = await walletService.getWalletBalance(userId);
  return c.json(balance);
});

walletRoutes.post('/add-funds', async (c: Context) => {
  const userId = c.get('userId');
  const { amount } = await c.req.json();
  const result = await walletService.addFunds(userId, amount);
  return c.json(result);
});

export default walletRoutes;
