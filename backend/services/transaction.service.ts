import ApiError from '../utils/ApiError.ts';

const transactions: any[] = [];
const users: any[] = [
  { id: 'demo-user-1', name: 'Ramesh Singh', balance: 5000, did: 'demo-user-1', averageTransactionAmount: 0, riskScore: 0, lastLoginState: null, createdAt: new Date() },
  { id: 'demo-user-2', name: 'Sita Devi', balance: 5000, did: 'demo-user-2', averageTransactionAmount: 0, riskScore: 0, lastLoginState: null, createdAt: new Date() },
  { id: 'demo-user-3', name: 'Shounak Sinha', balance: 5000, did: 'demo-user-3', averageTransactionAmount: 0, riskScore: 0, lastLoginState: null, createdAt: new Date() },
];

const findUserByIdentifier = (identifier: string) => {
  return users.find(u => u.did === identifier || u.id === identifier || u.email === identifier) || null;
};

export const getTransactions = async (userId: string) => {
  return transactions.filter(t => t.senderId === userId || t.receiverId === userId);
};

export const createTransaction = async (userId: string, data: { receiverId: string; amount: number; description?: string; locationState?: string }) => {
  const sender = users.find(u => u.id === userId);
  if (!sender) throw new ApiError(404, 'Sender not found');
  if ((sender.balance || 0) < data.amount) throw new ApiError(400, 'Insufficient balance');

  const receiver = findUserByIdentifier(data.receiverId);
  if (!receiver) throw new ApiError(404, 'Receiver not found');
  if (sender.id === receiver.id) throw new ApiError(400, 'Cannot send money to yourself');

  sender.balance -= data.amount;
  receiver.balance += data.amount;

  const transaction = {
    id: `txn-${Date.now()}`,
    senderId: userId,
    receiverId: receiver.id,
    amount: data.amount,
    description: data.description,
    status: 'completed',
    type: 'p2p',
    createdAt: new Date().toISOString(),
    sender: { name: sender.name, did: sender.did },
    receiver: { name: receiver.name, did: receiver.did },
  };
  transactions.push(transaction);

  return { ...transaction, updatedBalance: sender.balance, security: { isFlagged: false, alerts: [], riskScore: 0 } };
};

export const createPendingTransaction = async (data: { senderId: string; receiverId: string; amount: number }) => {
  const sender = users.find(u => u.id === data.senderId);
  if (!sender) throw new ApiError(404, 'Sender not found');
  const receiver = findUserByIdentifier(data.receiverId);
  if (!receiver) throw new ApiError(404, 'Receiver not found');

  sender.balance -= data.amount;
  const transaction = {
    id: `txn-${Date.now()}`,
    senderId: data.senderId,
    receiverId: receiver.id,
    amount: data.amount,
    status: 'pending',
    type: 'p2p',
    createdAt: new Date().toISOString(),
  };
  transactions.push(transaction);
  return { transactionStatus: 'Pending', transaction, updatedBalance: sender.balance };
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
  return [];
};

