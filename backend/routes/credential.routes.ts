import { Hono } from 'hono';
import * as credentialController from '../controllers/credential.controller.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const credentialRoutes = new Hono();
credentialRoutes.use('*', authMiddleware);
credentialRoutes.get('/', credentialController.getCredentials);
credentialRoutes.post('/', credentialController.issueCredential);
credentialRoutes.post('/eligibility', credentialController.issueEligibilityCredential);

export default credentialRoutes;
