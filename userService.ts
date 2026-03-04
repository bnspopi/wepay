import prisma from '../client.ts';
import { HandleOAuthCallback200 } from '@uptiqai/integrations-sdk';
import bcrypt from 'bcrypt';

/**
 * User Service - Prisma approach for persistent user and identity management
 */

export async function findOrCreateUser(profile: HandleOAuthCallback200, metadata?: Record<string, any>): Promise<any> {
    const existingIdentity = await prisma.userIdentity.findUnique({
        where: {
            provider_providerId: {
                provider: profile.provider,
                providerId: profile.providerId
            }
        }
    });

    if (existingIdentity) {
        if (metadata) {
            await prisma.userIdentity.update({
                where: { id: existingIdentity.id },
                data: { metadata: { ...((existingIdentity.metadata as any) || {}), ...metadata } }
            });
        }
        return await prisma.user.findUnique({ where: { id: existingIdentity.userId } });
    }

    const existingUser = await prisma.user.findUnique({ where: { email: profile.email } });

    if (existingUser) {
        await prisma.userIdentity.create({
            data: {
                userId: existingUser.id,
                provider: profile.provider,
                providerId: profile.providerId,
                metadata: metadata || profile.rawProfile || {}
            }
        });
        return existingUser;
    }

    const newUser = await prisma.user.create({
        data: {
            email: profile.email,
            name: profile.name || null,
            balance: 5000,
            did: profile.providerId,
        }
    });

    await prisma.userIdentity.create({
        data: {
            userId: newUser.id,
            provider: profile.provider,
            providerId: profile.providerId,
            metadata: metadata || profile.rawProfile || {}
        }
    });

    return newUser;
}

export async function getUserById(userId: string): Promise<any | null> {
    return await prisma.user.findUnique({ where: { id: userId } });
}

export async function getUserByEmail(email: string): Promise<any | null> {
    return await prisma.user.findUnique({ where: { email: email } });
}

export async function getUserIdentities(userId: string) {
    return await prisma.userIdentity.findMany({ where: { userId: userId } });
}

export async function unlinkIdentity(userId: string, provider: string): Promise<void> {
    const identities = await getUserIdentities(userId);

    if (identities.length <= 1) {
        throw new Error('Cannot unlink last identity. User must have at least one login method.');
    }

    const identity = await prisma.userIdentity.findFirst({
        where: { userId: userId, provider: provider }
    });

    if (identity) {
        await prisma.userIdentity.update({
            where: { id: identity.id },
            data: { isDeleted: true }
        });
    }
}

export async function registerWithEmailPassword(email: string, password: string, name?: string): Promise<any> {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            email,
            name: name || null,
            balance: 5000,
            did: `did-email-${Date.now()}`,
        }
    });

    await prisma.userIdentity.create({
        data: {
            userId: newUser.id,
            provider: 'EmailPassword',
            providerId: email,
            metadata: {
                passwordHash,
                emailVerified: false,
                registeredAt: new Date().toISOString()
            }
        }
    });

    return newUser;
}

export async function authenticateWithEmailPassword(email: string, password: string): Promise<any> {
    // Demo Mode: Allow login with demo123 for any email
    if (password !== 'demo123') {
        throw new Error('Invalid email or password. Use demo123 for demo mode.');
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return existingUser;
    }

    // Auto-create user if not found
    const newUser = await prisma.user.create({
        data: {
            email,
            name: email.split('@')[0],
            balance: 5000,
            did: `did-demo-${Date.now()}`,
        }
    });

    await prisma.userIdentity.create({
        data: {
            userId: newUser.id,
            provider: 'EmailPassword',
            providerId: email,
            metadata: {
                passwordHash: 'demo-password',
                emailVerified: true,
                registeredAt: new Date().toISOString(),
                lastLoginAt: new Date().toISOString()
            }
        }
    });

    return newUser;
}

export async function findOrCreateUserByPhone(phone: string, name?: string): Promise<any> {
    const existingIdentity = await prisma.userIdentity.findUnique({
        where: {
            provider_providerId: {
                provider: 'PhoneOTP',
                providerId: phone
            }
        }
    });

    if (existingIdentity) {
        await prisma.userIdentity.update({
            where: { id: existingIdentity.id },
            data: { metadata: { ...((existingIdentity.metadata as any) || {}), lastLoginAt: new Date().toISOString() } }
        });
        return await prisma.user.findUnique({ where: { id: existingIdentity.userId } });
    }

    const newUser = await prisma.user.create({
        data: {
            email: `${phone.replace(/[^0-9]/g, '')}@phone.local`,
            name: name || null,
            balance: 5000,
            did: phone,
        }
    });

    await prisma.userIdentity.create({
        data: {
            userId: newUser.id,
            provider: 'PhoneOTP',
            providerId: phone,
            metadata: {
                phone,
                phoneVerified: true,
                registeredAt: new Date().toISOString(),
                lastLoginAt: new Date().toISOString()
            }
        }
    });

    return newUser;
}

export async function updateUser(userId: string, data: Partial<any>): Promise<any> {
    return await prisma.user.update({
        where: { id: userId },
        data: data
    });
}

export async function getAllUsers(limit: number = 100): Promise<any[]> {
    const userCount = await prisma.user.count();
    
    // Seed demo users if no users exist
    if (userCount === 0) {
        await prisma.user.createMany({
            data: [
                { 
                    id: "demo-user-1", 
                    email: "ramesh@example.com",
                    name: "Ramesh Singh", 
                    balance: 5000, 
                    did: "demo-user-1",
                    location: "Saran, Bihar",
                    state: "Bihar",
                    district: "Saran"
                },
                { 
                    id: "demo-user-2", 
                    email: "sita@example.com",
                    name: "Sita Devi", 
                    balance: 5000, 
                    did: "demo-user-2",
                    location: "Saran, Bihar",
                    state: "Bihar",
                    district: "Saran"
                },
                { 
                    id: "demo-user-3", 
                    email: "shounak@example.com",
                    name: "Shounak Sinha", 
                    balance: 5000, 
                    did: "demo-user-3",
                    location: "Kolkata, West Bengal",
                    state: "West Bengal",
                    district: "Kolkata"
                }
            ]
        });
    }

    return await prisma.user.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' }
    });
}
