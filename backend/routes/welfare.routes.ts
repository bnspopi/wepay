import { Hono } from 'hono';
import * as welfareController from '../controllers/welfare.controller.ts';
import * as transactionController from '../controllers/transaction.controller.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const welfareRoutes = new Hono();

welfareRoutes.get('/schemes', welfareController.getSchemes);
welfareRoutes.get('/schemes/:id', welfareController.getSchemeById);
welfareRoutes.post('/check-eligibility', welfareController.checkEligibility);
welfareRoutes.get('/payments', authMiddleware, transactionController.getWelfarePayments);

export default welfareRoutes;
