import { Hono, Context } from 'hono';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import * as walletService from '../services/wallet.service.ts';
import catchAsync from '../utils/catchAsync.ts';

const walletRoutes = new Hono();

walletRoutes.use('*', authMiddleware);

walletRoutes.get('/balance', catchAsync(async (c: Context) => {

    const userId = c.get('userId');

    const balance = await walletService.getWalletBalance(userId);

    return c.json(balance);

}));



walletRoutes.post('/add-funds', catchAsync(async (c: Context) => {

    const userId = c.get('userId');

    const { amount } = await c.req.json();

    const result = await walletService.addFunds(userId, amount);

    return c.json(result);

}));



export default walletRoutes;
