"use server"

import { prisma } from "@/lib/prisma"

export async function verifyEmail(token: string) {
    const record = await prisma.verificationTokens.findUnique({
        where: {
            token
        }
    })

    if (!record) {
        return {
            error: "Invalid Token"
        }
    }

    if (record.expiresAt < new Date()) {
        return {
            error: "Token expired"
        }
    }

    await prisma.user.update({
        where: {
            id: record.userId
        },
        data: {
            emailVarified: true
        }
    })

    return {
        success: true
    }
}