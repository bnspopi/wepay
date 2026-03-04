import prisma from '../client.ts';
import { Email, EmailProvider } from '@uptiqai/integrations-sdk';

/**
 * Wallet Service - Handles wallet and balance operations using Prisma
 */

export async function getWalletBalance(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { balance: true }
    });

    return {
        balance: user?.balance || 0
    };
}

export async function addFunds(userId: string, amount: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { balance: (user.balance || 0) + amount }
    });

    try {
        const email = new Email({ provider: EmailProvider.Resend });
        await email.sendEmail({
            to: ['sinhashounak@gmail.com'],
            subject: 'WePay Wallet Updated',
            html: `
                <p>Funds Added Successfully.</p>
                <p>User: ${updatedUser.name || 'User'}</p>
                <p>Amount Added: ₹${amount}</p>
                <p>Wallet Updated Successfully.</p>
            `
        });
    } catch (error) {
        console.error('Failed to send email:', error);
    }

    return {
        balance: updatedUser.balance
    };
}
