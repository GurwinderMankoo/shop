// app/api/auth/google/login/route.ts

import { buildGoogleAuthUrl } from "@/lib/auth/google";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const state = randomBytes(32).toString("hex");

    const cookieStore = await cookies();

    cookieStore.set("google_oauth_state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 10,
    });

    const googleUrl = buildGoogleAuthUrl(state);

    return NextResponse.redirect(googleUrl);
}