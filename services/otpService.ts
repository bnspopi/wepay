/**
 * OTP Service - In-memory approach
 */

const otps: any[] = [];

export const generateAndSendOTP = async (phone: string) => {
  // Clear old OTPs for this phone
  const index = otps.findIndex(o => o.phone === phone);
  if (index !== -1) otps.splice(index, 1);

  const code = '123456'; // Fixed for demo
  otps.push({
    phone,
    code,
    expiresAt: new Date(Date.now() + 5 * 60000), // 5 mins
    verified: false
  });

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
