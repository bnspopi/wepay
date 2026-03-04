
export interface User {
  id: string;
  email: string;
  name: string | null;
  balance: number;
  did: string | null;
  location?: string;
  state?: string;
  district?: string;
  village?: string;
  language?: string;
  onboarded?: boolean;
  role?: string;
  savingsLockedUntil?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  senderId: string;
  receiverId: string;
  amount: number;
  description?: string;
  status: string;
  type: string;
  isDeleted: boolean;
  createdAt: string;
}

export interface WelfarePayment {
  id: string;
  userId: string;
  amount: number;
  schemeName: string;
  paidAt: string;
  isDeleted: boolean;
}

export const users: User[] = [
  { 
    id: "demo-user-1", 
    email: "ramesh@example.com",
    name: "Ramesh", 
    balance: 5000, 
    did: "demo-user-1",
    isDeleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: "demo-user-2", 
    email: "sita@example.com",
    name: "Sita", 
    balance: 5000, 
    did: "demo-user-2",
    isDeleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: "demo-user-3", 
    email: "shounak@example.com",
    name: "Shounak Sinha", 
    balance: 5000, 
    did: "demo-user-3",
    isDeleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const transactions: Transaction[] = [];
export const welfarePayments: WelfarePayment[] = [];
export const userIdentities: any[] = [];
export const credentials: any[] = [];
