import type { Context } from 'hono';
import * as welfareService from '../services/welfare.service.ts';
import { checkEligibility as checkEligibilityUtil } from '../services/eligibility.ts';

export const getSchemes = async (c: Context) => {
  try {
    const schemes = await welfareService.getSchemes();
    return c.json(schemes);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
};

export const getSchemeById = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const scheme = await welfareService.getSchemeById(id);
    if (!scheme) return c.json({ message: 'Scheme not found' }, 404);
    return c.json(scheme);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
};

export const checkEligibility = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { schemeName, state } = body;
    const result = checkEligibilityUtil(state, schemeName);
    return c.json(result);
  } catch (error: any) {
    return c.json({ message: error.message }, 400);
  }
};
