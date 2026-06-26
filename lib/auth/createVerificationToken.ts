import { prisma } from "../prisma";


export async function createVerificationToken(userId: string) {
    const token = crypto.randomUUID();

    await prisma.verificationTokens.create({
        data: {
            token,
            userId,
            expiresAt: new Date(Date.now() + 1000 * 60 * 5)
        }
    })

    return token

}