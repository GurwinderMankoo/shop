import { cookies } from "next/headers";
import { prisma } from "../prisma";


export async function getCurrentUser() {

    const token = (await cookies()).get("session")?.value;


    if (!token) {
        return null;
    }


    const session =
        await prisma.session.findUnique({
            where: {
                token
            },
            include: {
                user: true
            }
        });


    if (!session) {
        return null;
    }


    if (session.expiresAt < new Date()) {
        await prisma.session.delete({
            where: {
                token
            }
        });

        return null;
    }


    return {
        email: session.user.email,
        id: session.user.id,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        role: session.user.role,
        createdAt: session.user.createdAt,
        pendingEmail: session.user.pendingEmail,
        emailVerified: session.user.emailVerified,
        updatedAt: session.user.updatedAt
    };
}