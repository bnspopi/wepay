import { Context } from 'hono';
import * as credentialService from '../services/credential.service.ts';
import catchAsync from '../utils/catchAsync.ts';


export const getCredentials = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const credentials = await credentialService.getCredentials(userId);
  return c.json(credentials);
});

export const issueCredential = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const credential = await credentialService.createCredential(userId, body);
  return c.json(credential, 201);
});

export const issueEligibilityCredential = catchAsync(async (c: Context) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const credential = await credentialService.checkAndIssueEligibilityCredential(userId, body);
  return c.json(credential, 201);
});
