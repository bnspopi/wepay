import { Context } from 'hono';
import * as welfareService from '../services/welfare.service.ts';
import catchAsync from '../utils/catchAsync.ts';
import { checkEligibility as checkEligibilityUtil } from '../utils/eligibility.ts';


export const getSchemes = catchAsync(async (c: Context) => {
  const schemes = await welfareService.getSchemes();
  return c.json(schemes);
});

export const getSchemeById = catchAsync(async (c: Context) => {
  const id = c.req.param('id');
  const scheme = await welfareService.getSchemeById(id);
  if (!scheme) {
    return c.json({ message: 'Scheme not found' }, 404);
  }
  return c.json(scheme);
});

export const checkEligibility = catchAsync(async (c: Context) => {
  const body = await c.req.json();
  const { schemeName, state } = body;
  const result = checkEligibilityUtil(state, schemeName);
  return c.json(result);
});
