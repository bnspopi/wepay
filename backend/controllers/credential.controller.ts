import type { Context } from 'hono';

const credentials: any[] = [];

export const getCredentials = async (c: Context) => {
  const userId = c.get('userId');
  return c.json(credentials.filter(cr => cr.userId === userId));
};

export const issueCredential = async (c: Context) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const credential = {
      id: `cred-${Date.now()}`,
      userId,
      type: body.type,
      issuer: 'Government of India',
      data: body.data,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    credentials.push(credential);
    return c.json(credential, 201);
  } catch (error: any) {
    return c.json({ message: error.message }, 400);
  }
};

export const issueEligibilityCredential = async (c: Context) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const credential = {
      id: `cred-el-${Date.now()}`,
      userId,
      type: 'Eligibility',
      issuer: 'Welfare Department',
      data: { schemeName: body.schemeName, status: 'Eligible', verifiedAt: new Date().toISOString() },
      status: 'active',
      createdAt: new Date().toISOString()
    };
    credentials.push(credential);
    return c.json(credential, 201);
  } catch (error: any) {
    return c.json({ message: error.message }, 400);
  }
};
