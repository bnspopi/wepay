import type { Context } from 'hono';
import * as tokenService from '../services/tokenService.ts';
import * as userService from '../services/userService.ts';
import * as otpService from '../services/otpService.ts';

export async function register(c: Context) {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;
    if (!email || !password) return c.json({ message: 'Email and password are required' }, 400);
    const user = await userService.registerWithEmailPassword(email, password, name);
    const tokens = tokenService.generateTokens(user.id, user.email);
    return c.json({ ...tokens, user: { id: user.id, email: user.email, name: user.name, balance: user.balance } }, 201);
  } catch (error: any) {
    return c.json({ message: error.message }, 400);
  }
}

export async function login(c: Context) {
  try {
    const body = await c.req.json();
    const { email, password } = body;
    if (!email || !password) return c.json({ message: 'Email and password are required' }, 400);
    const user = await userService.authenticateWithEmailPassword(email, password);
    const tokens = tokenService.generateTokens(user.id, user.email);
    return c.json({ ...tokens, user: { id: user.id, email: user.email, name: user.name, balance: user.balance } });
  } catch (error: any) {
    return c.json({ message: error.message }, 401);
  }
}

export async function refreshToken(c: Context) {
  try {
    const body = await c.req.json();
    const { refreshToken } = body;
    if (!refreshToken) return c.json({ message: 'Refresh token is required' }, 400);
    const newAccessToken = tokenService.refreshAccessToken(refreshToken);
    return c.json({ accessToken: newAccessToken });
  } catch {
    return c.json({ message: 'Invalid or expired refresh token' }, 401);
  }
}

export async function getCurrentUser(c: Context) {
  const userId = c.get('userId');
  if (!userId) return c.json({ message: 'Unauthorized' }, 401);
  const user = await userService.getUserById(userId);
  if (!user) return c.json({ message: 'User not found' }, 404);
  return c.json({ user });
}

export async function sendPhoneOTP(c: Context) {
  try {
    const { phone } = await c.req.json();
    if (!phone) return c.json({ message: 'Phone number is required' }, 400);
    if (!/^\+?[1-9]\d{1,14}$/.test(phone)) return c.json({ message: 'Invalid phone number format' }, 400);
    await otpService.generateAndSendOTP(phone);
    return c.json({ message: 'OTP sent successfully', expiresIn: 600 });
  } catch (error: any) {
    return c.json({ message: error.message }, 400);
  }
}

export async function verifyPhoneOTP(c: Context) {
  try {
    const { phone, otp, name } = await c.req.json();
    if (!phone || !otp) return c.json({ message: 'Phone number and OTP are required' }, 400);
    const isVerified = await otpService.verifyOTP(phone, otp);
    if (!isVerified) return c.json({ message: 'Invalid or expired OTP' }, 401);
    const user = await userService.findOrCreateUserByPhone(phone, name);
    const tokens = tokenService.generateTokens(user.id, user.email);
    return c.json({ ...tokens, user: { id: user.id, email: user.email, name: user.name, balance: user.balance } });
  } catch (error: any) {
    return c.json({ message: error.message }, 401);
  }
}
