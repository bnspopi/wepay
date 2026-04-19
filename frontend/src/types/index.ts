export interface WelfareScheme {
  id: string;
  title: string;
  description: string;
  category: string;
  benefits: string[];
  eligibility: string[];
  status?: "eligible" | "not-eligible" | "pending";
  icon?: string;
}

export interface VerifiableCredential {
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: Record<string, string>;
  status: "active" | "revoked" | "expired";
  icon?: string;
}

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
}

export interface Transaction {
  id: string;
  senderId: string | null;
  receiverId: string | null;
  amount: number;
  description?: string;
  status: string;
  type: string;
  createdAt: string;
  sender?: { name: string | null; did: string | null };
  receiver?: { name: string | null; did: string | null };
}
