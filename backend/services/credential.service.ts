import { credentials } from '../store.ts';

export interface Credential {
  id: string;
  userId: string;
  type: string;
  issuer: string;
  data: any;
  status: string;
  createdAt: string;
}

export const getCredentials = async (userId: string) => {
  return credentials.filter(c => c.userId === userId);
};

export const createCredential = async (userId: string, data: { type: string, data: any }) => {
  const credential = {
    id: `cred-${Date.now()}`,
    userId,
    type: data.type,
    issuer: 'Government of India',
    data: data.data,
    status: 'active',
    createdAt: new Date().toISOString()
  };
  credentials.push(credential);
  return credential;
};

export const checkAndIssueEligibilityCredential = async (userId: string, data: { schemeName: string }) => {
  const credential = {
    id: `cred-el-${Date.now()}`,
    userId,
    type: 'Eligibility',
    issuer: 'Welfare Department',
    data: {
      schemeName: data.schemeName,
      status: 'Eligible',
      verifiedAt: new Date().toISOString()
    },
    status: 'active',
    createdAt: new Date().toISOString()
  };
  
  credentials.push(credential);
  return credential;
};
