import { Hono } from 'hono';
import * as authController from '../controllers/authController.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const authRoutes = new Hono();

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);
authRoutes.post('/refresh', authController.refreshToken);
authRoutes.post('/phone/send-otp', authController.sendPhoneOTP);
authRoutes.post('/phone/verify-otp', authController.verifyPhoneOTP);
authRoutes.get('/me', authMiddleware, authController.getCurrentUser);

export default authRoutes;
