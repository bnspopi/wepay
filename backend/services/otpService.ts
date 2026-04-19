const otps: any[] = [];

export const generateAndSendOTP = async (phone: string) => {
  const index = otps.findIndex(o => o.phone === phone);
  if (index !== -1) otps.splice(index, 1);
  const code = '123456';
  otps.push({ phone, code, expiresAt: new Date(Date.now() + 5 * 60000), verified: false });
  console.log(`OTP for ${phone}: ${code}`);
  return { success: true };
};

export const verifyOTP = async (phone: string, code: string) => {
  const otpRecord = otps.find(o => o.phone === phone && o.code === code && !o.verified);
  if (!otpRecord) return false;
  if (new Date() > otpRecord.expiresAt) return false;
  otpRecord.verified = true;
  return true;
};

