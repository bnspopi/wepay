import { Hono } from 'hono';
import * as transactionController from '../controllers/transaction.controller.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const transactionRoutes = new Hono();
transactionRoutes.use('*', authMiddleware);

transactionRoutes.get('/', transactionController.getTransactions);
transactionRoutes.post('/', transactionController.createTransaction);
transactionRoutes.post('/create-transaction', transactionController.createPendingTransaction);
transactionRoutes.post('/sync', transactionController.syncTransactions);

export default transactionRoutes;
