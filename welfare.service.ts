import prisma from '../client.ts';

/**
 * Welfare Service - Prisma approach
 */

export const getSchemes = async (state?: string) => {
  if (state && state !== 'All') {
    return await prisma.welfareScheme.findMany({
      where: {
        OR: [
          { title: { contains: state } }, // Simple search if state is in title
          { description: { contains: state } }
        ]
      }
    });
  }
  return await prisma.welfareScheme.findMany();
};

export const getSchemeById = async (id: string) => {
  // Check if id is number (autoincrement) or string
  const numId = parseInt(id);
  if (!isNaN(numId)) {
    return await prisma.welfareScheme.findUnique({ where: { id: numId } });
  }
  return null;
};

export const getUserWelfarePayments = async (userId: string) => {
  return await prisma.welfarePayment.findMany({
    where: { userId: userId },
    orderBy: { paidAt: 'desc' }
  });
};

export const checkEligibility = async (data: { schemeName: string, state: string, district: string, aadhaarLast4: string }) => {
  const scheme = await prisma.welfareScheme.findFirst({
    where: { title: data.schemeName }
  });
  
  // Basic mock eligibility logic
  const isEligible = data.aadhaarLast4.length === 4;
  
  return {
    status: isEligible ? 'Eligible' : 'Not Eligible',
    amount: isEligible ? (scheme ? 1000 : 0) : undefined // Mock amount
  };
};
