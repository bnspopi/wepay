const users: any[] = [
  { id: 'demo-user-1', balance: 5000 },
  { id: 'demo-user-2', balance: 5000 },
  { id: 'demo-user-3', balance: 5000 },
];

export async function getWalletBalance(userId: string) {
  const user = users.find(u => u.id === userId);
  return { balance: user?.balance || 0 };
}

export async function addFunds(userId: string, amount: number) {
  const user = users.find(u => u.id === userId);
  if (!user) throw new Error('User not found');
  user.balance += amount;
  return { balance: user.balance };
}

