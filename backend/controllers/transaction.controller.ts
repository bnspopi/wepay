import type { Context } from 'hono';
import * as transactionService from '../services/transaction.service.ts';

export const getTransactions = async (c: Context) => {
  try {
    const userId = c.get('userId');
    const transactions = await transactionService.getTransactions(userId);
    return c.json(transactions);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
};

export const createTransaction = async (c: Context) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const transaction = await transactionService.createTransaction(userId, body);
    return c.json(transaction);
  } catch (error: any) {
    return c.json({ message: error.message }, 400);
  }
};

export const createPendingTransaction = async (c: Context) => {
  try {
    const body = await c.req.json();
    const result = await transactionService.createPendingTransaction(body);
    return c.json(result);
  } catch (error: any) {
    return c.json({ message: error.message }, 400);
  }
};

export const syncTransactions = async (c: Context) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const results = await transactionService.syncTransactions(userId, body.transactions);
    return c.json({ success: true, results });
  } catch (error: any) {
    return c.json({ message: error.message }, 400);
  }
};

export const getWelfarePayments = async (c: Context) => {
  try {
    const userId = c.get('userId');
    const payments = await transactionService.getWelfarePayments(userId);
    return c.json(payments);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
};
