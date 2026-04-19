// In-memory user store for demo (replace with Prisma for production)
const users: any[] = [
  { id: 'demo-user-1', email: 'ramesh@example.com', name: 'Ramesh Singh', balance: 5000, did: 'demo-user-1', state: 'Bihar' },
  { id: 'demo-user-2', email: 'sita@example.com', name: 'Sita Devi', balance: 5000, did: 'demo-user-2', state: 'Bihar' },
  { id: 'demo-user-3', email: 'shounak@example.com', name: 'Shounak Sinha', balance: 5000, did: 'demo-user-3', state: 'West Bengal' },
];

export async function getUserById(userId: string) {
  return users.find(u => u.id === userId) || null;
}

export async function getUserByEmail(email: string) {
  return users.find(u => u.email === email) || null;
}

export async function getAllUsers() {
  return users;
}

export async function registerWithEmailPassword(email: string, password: string, name?: string) {
  const existing = await getUserByEmail(email);
  if (existing) throw new Error('User with this email already exists');
  const newUser = {
    id: `user-${Date.now()}`,
    email,
    name: name || null,
    balance: 5000,
    did: `did-email-${Date.now()}`,
  };
  users.push(newUser);
  return newUser;
}

export async function authenticateWithEmailPassword(email: string, password: string) {
  if (password !== 'demo123') throw new Error('Invalid email or password. Use demo123 for demo mode.');
  const existing = await getUserByEmail(email);
  if (existing) return existing;
  const newUser = {
    id: `user-${Date.now()}`,
    email,
    name: email.split('@')[0],
    balance: 5000,
    did: `did-demo-${Date.now()}`,
  };
  users.push(newUser);
  return newUser;
}

export async function findOrCreateUserByPhone(phone: string, name?: string) {
  const existing = users.find(u => u.did === phone);
  if (existing) return existing;
  const newUser = {
    id: `user-${Date.now()}`,
    email: `${phone.replace(/[^0-9]/g, '')}@phone.local`,
    name: name || null,
    balance: 5000,
    did: phone,
  };
  users.push(newUser);
  return newUser;
}

export async function updateUser(userId: string, data: Partial<any>) {
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) throw new Error('User not found');
  users[index] = { ...users[index], ...data };
  return users[index];
}

export async function getUserIdentities(userId: string) {
  return [];
}

export async function unlinkIdentity(userId: string, provider: string) {
  return;
}

export async function findOrCreateUser(profile: any, metadata?: any) {
  const existing = await getUserByEmail(profile.email);
  if (existing) return existing;
  const newUser = {
    id: `user-${Date.now()}`,
    email: profile.email,
    name: profile.name || null,
    balance: 5000,
    did: profile.providerId,
  };
  users.push(newUser);
  return newUser;
}

