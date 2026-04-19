export interface TokenPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Simple JWT implementation without external dependency for demo
const sign = (payload: object, secret: string, expiresIn: number): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ ...payload, exp: Date.now() + expiresIn, iat: Date.now() }));
  return `${header}.${body}.${secret.slice(0, 8)}`;
};

const verify = (token: string): TokenPayload => {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid token');
  const payload = JSON.parse(atob(parts[1]));
  if (payload.exp < Date.now()) throw new Error('Token expired');
  return payload as TokenPayload;
};

const ACCESS_EXPIRY = 15 * 60 * 1000;
const REFRESH_EXPIRY = 30 * 24 * 60 * 60 * 1000;
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-access-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret';

export function generateTokens(userId: string, email: string): AuthTokens {
  return {
    accessToken: sign({ userId, email }, ACCESS_SECRET, ACCESS_EXPIRY),
    refreshToken: sign({ userId, email }, REFRESH_SECRET, REFRESH_EXPIRY),
  };
}

export function verifyAccessToken(token: string): TokenPayload {
  return verify(token);
}

export function verifyRefreshToken(token: string): TokenPayload {
  return verify(token);
}

export function refreshAccessToken(refreshToken: string): string {
  const payload = verifyRefreshToken(refreshToken);
  return sign({ userId: payload.userId, email: payload.email }, ACCESS_SECRET, ACCESS_EXPIRY);
}

