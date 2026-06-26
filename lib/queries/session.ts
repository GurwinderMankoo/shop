"use server"

import { cookies } from 'next/headers';
import crypto from 'crypto';
import { prisma } from '../prisma';


export async function createSession(userId: string) {

    const token = crypto.randomBytes(32).toString('hex');

    await prisma.session.create({
        data: {
            token,
            userId,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1)
        }
    });

    const cookieStore = await cookies();

    cookieStore.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1)
    });
}
