import { Context } from 'hono';
import * as transactionService from '../services/transaction.service.ts';
import catchAsync from '../utils/catchAsync.ts';

export const getTransactions = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const transactions = await transactionService.getTransactions(userId);
  return c.json(transactions);
});

export const createTransaction = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const transaction = await transactionService.createTransaction(userId, body);
  return c.json(transaction);
});

export const createPendingTransaction = catchAsync(async (c: Context) => {
  const body = await c.req.json();
  const result = await transactionService.createPendingTransaction(body);
  return c.json(result);
});

export const syncTransactions = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const results = await transactionService.syncTransactions(userId, body.transactions);
  return c.json({ success: true, results });
});

export const getWelfarePayments = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const payments = await transactionService.getWelfarePayments(userId);
  return c.json(payments);
});
