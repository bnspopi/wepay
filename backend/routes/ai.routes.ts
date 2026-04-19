import { Hono } from 'hono';
import * as aiController from '../controllers/ai.controller.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const aiRoutes = new Hono();
aiRoutes.use('*', authMiddleware);
aiRoutes.post('/chat', aiController.chat);

export default aiRoutes;
