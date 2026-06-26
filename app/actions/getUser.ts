'use server';

import { getCurrentUser } from "@/lib/queries/getCurrentUser";

export const getUser = async () => {
    const user = await getCurrentUser();

    if (!user) {
        return null;
    }

    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
    }
}