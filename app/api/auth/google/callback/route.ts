import { exchangeCodeForTokens, verifyGoogleIdToken } from "@/lib/auth/google";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/queries/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    //GET state and code
    const state = request.nextUrl.searchParams.get("state");
    const code = request.nextUrl.searchParams.get("code");

    //Verify state
    const cookieStore = await cookies();
    const storedState = cookieStore.get("google_oauth_state")?.value;

    if (!state || !code || state !== storedState) {
        return NextResponse.json({ error: "Invalid OAuth state" }, { status: 400 });
    }

    cookieStore.delete("google_oauth_state");

    //Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);

    const user = await verifyGoogleIdToken(tokens.id_token);

    let existingUser = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    })

    if (!existingUser) {
        existingUser = await prisma.user.create({
            data: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: "CUSTOMER",
                emailVerified: user.email_verified,
                password: "",
                image: user.picture
            }
        })
    }
    await createSession(existingUser.id);
    return NextResponse.redirect(new URL("/", request.url));


    // return NextResponse.json({
    //     success: true,
    //     errors: {},
    //     user: {
    //         id: existingUser.id,
    //         email: existingUser.email,
    //         firstName: existingUser.firstName,
    //         lastName: existingUser.lastName,
    //         role: existingUser.role,
    //         image: existingUser.image
    //     }
    // });
}