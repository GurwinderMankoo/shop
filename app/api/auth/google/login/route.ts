// app/api/auth/google/login/route.ts

import { buildGoogleAuthUrl } from "@/lib/auth/google";
import { encodeState } from "@/lib/helper";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const secureToken = randomBytes(32).toString("hex");

    const cookieStore = await cookies();

    cookieStore.set("google_oauth_state", secureToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 10,
    });

    const stateData = {
        token: secureToken,
        callbackUrl: callbackUrl
    };

    const state = encodeState(stateData);


    const googleUrl = buildGoogleAuthUrl(state);

    return NextResponse.redirect(googleUrl);
}