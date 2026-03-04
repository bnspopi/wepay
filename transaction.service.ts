import prisma from '../client.ts';
import ApiError from '../utils/ApiError.ts';
import { Email, EmailProvider } from '@uptiqai/integrations-sdk';

const sendTransactionEmail = async (name: string, amount: number) => {
  try {
    const email = new Email({ provider: EmailProvider.Resend });
    await email.sendEmail({
      to: ['sinhashounak@gmail.com'],
      subject: 'WePay Payment Successful',
      html: `
        <p>Payment Completed Successfully.</p>
        <p>User: ${name}</p>
        <p>Amount Sent: ₹${amount}</p>
        <p>Wallet Updated Successfully.</p>
      `,
    });
  } catch (error) {
    console.error('Failed to send transaction email:', error);
  }
};

export const getTransactions = async (userId: string) => {
  return await prisma.transaction.findMany({
    where: {
      OR: [
        { senderId: userId },
        { receiverId: userId }
      ]
    },
    orderBy: { createdAt: 'desc' },
    include: {
      sender: { select: { name: true, did: true } },
      receiver: { select: { name: true, did: true } }
    }
  });
};

const findUserByIdentifier = async (identifier: string) => {
  if (!identifier) return null;
  const searchId = identifier.trim();
  
  // 1. First try to find by DID
  const userByDid = await prisma.user.findFirst({ where: { did: searchId } });
  if (userByDid) return userByDid;

  // 2. Then try to find by ID (Removed length === 36 check to support demo IDs)
  const userById = await prisma.user.findUnique({ where: { id: searchId } });
  if (userById) return userById;

  // 3. Then try by email
  const userByEmail = await prisma.user.findUnique({ where: { email: searchId } });
  if (userByEmail) return userByEmail;
  
  return null;
};

/**
 * Multi-layer Security Engine
 */
const performSecurityChecks = async (sender: any, amount: number, locationState?: string) => {
  const securityAlerts = [];
  let riskScore = 0;

  // LAYER 1: Rule-Based Security
  
  // 1. High Value Transaction Check
  if (amount > 10000) {
    securityAlerts.push("Transaction flagged for verification (Amount > ₹10,000)");
    riskScore += 0.3;
  }

  // 2. Rapid Transaction Check (More than 3 in 60 seconds)
  const oneMinuteAgo = new Date(Date.now() - 60000);
  const recentTxnsCount = await prisma.transaction.count({
    where: {
      senderId: sender.id,
      createdAt: { gte: oneMinuteAgo }
    }
  });

  if (recentTxnsCount >= 3) {
    securityAlerts.push("Multiple transactions detected. Risk alert triggered.");
    riskScore += 0.4;
  }

  // 3. Geo-location mismatch
  if (locationState && sender.lastLoginState && locationState !== sender.lastLoginState) {
    securityAlerts.push(`Location mismatch detected: ${locationState} (Previous: ${sender.lastLoginState})`);
    riskScore += 0.2;
  }

  // 4. New User High Value Check
  const isNewUser = new Date(sender.createdAt).getTime() > Date.now() - (24 * 60 * 60 * 1000); // Created within 24h
  if (isNewUser && amount > 3000) {
    securityAlerts.push("New account high-value transaction flagged.");
    riskScore += 0.2;
  }

  // LAYER 2: Behavioral Detection (AI-like Simulation)
  if (sender.averageTransactionAmount > 0 && amount > sender.averageTransactionAmount * 3) {
    securityAlerts.push("Unusual transaction pattern detected (Amount significantly higher than average)");
    riskScore += 0.3;
  }

  // LAYER 3: ML-Based (Simulated Risk Score)
  // Clamp risk score at 1.0
  riskScore = Math.min(riskScore, 1.0);

  return {
    isFlagged: securityAlerts.length > 0,
    alerts: securityAlerts,
    riskScore
  };
};

export const createTransaction = async (userId: string, data: { receiverId: string, amount: number, description?: string, locationState?: string }) => {
  const sender = await prisma.user.findUnique({ where: { id: userId } });
  
  if (!sender) {
    throw new ApiError(404, 'Sender not found');
  }

  if ((sender.balance || 0) < data.amount) {
    throw new ApiError(400, 'Insufficient balance');
  }

  const receiver = await findUserByIdentifier(data.receiverId);

  if (!receiver) {
    throw new ApiError(404, 'Receiver DID not found');
  }

  if (sender.id === receiver.id) {
    throw new ApiError(400, 'Cannot send money to yourself');
  }

  // Perform Security Checks
  const securityResult = await performSecurityChecks(sender, data.amount, data.locationState);

  // If risk score is too high, we might want to block it in a real app
  // For demo, we'll process but return the alerts
  
  // Update balances
  const updatedSender = await prisma.user.update({
    where: { id: sender.id },
    data: { 
      balance: (sender.balance || 0) - data.amount,
      lastLoginState: data.locationState || sender.lastLoginState,
      riskScore: securityResult.riskScore,
      // Update average transaction amount
      averageTransactionAmount: sender.averageTransactionAmount === 0 
        ? data.amount 
        : (sender.averageTransactionAmount! + data.amount) / 2
    }
  });

  await prisma.user.update({
    where: { id: receiver.id },
    data: { balance: (receiver.balance || 0) + data.amount }
  });

  // Create transaction record
  const transaction = await prisma.transaction.create({
    data: {
      senderId: userId,
      receiverId: receiver.id,
      amount: data.amount,
      description: data.description,
      status: securityResult.isFlagged ? 'flagged' : 'completed',
      type: 'p2p'
    },
    include: {
      sender: { select: { name: true, did: true } },
      receiver: { select: { name: true, did: true } }
    }
  });

  // Send email notification on success
  await sendTransactionEmail(sender.name || 'User', data.amount);

  return {
    ...transaction,
    updatedBalance: updatedSender.balance,
    security: securityResult
  };
};

export const createPendingTransaction = async (data: { senderId: string, receiverId: string, amount: number }) => {
  const sender = await prisma.user.findUnique({ where: { id: data.senderId } });
  if (!sender) {
    throw new ApiError(404, 'Sender not found');
  }

  const receiver = await findUserByIdentifier(data.receiverId);
  if (!receiver) {
    throw new ApiError(404, 'Receiver DID not found');
  }

  await prisma.user.update({
    where: { id: sender.id },
    data: { balance: (sender.balance || 0) - data.amount }
  });

  const transaction = await prisma.transaction.create({
    data: {
      senderId: data.senderId,
      receiverId: receiver.id,
      amount: data.amount,
      status: 'pending',
      type: 'p2p'
    }
  });

  await sendTransactionEmail(sender.name || 'User', data.amount);

  return {
    transactionStatus: "Pending",
    transaction,
    updatedBalance: (sender.balance || 0) - data.amount
  };
};

export const syncTransactions = async (userId: string, txs: any[]) => {
  const results = [];
  for (const txData of txs) {
    try {
      const res = await createTransaction(userId, txData);
      results.push(res);
    } catch (err) {
      console.error('Error syncing transaction:', err);
    }
  }
  return results;
};

export const getWelfarePayments = async (userId: string) => {
  return await prisma.welfarePayment.findMany({
    where: { userId: userId },
    orderBy: { paidAt: 'desc' }
  });
};