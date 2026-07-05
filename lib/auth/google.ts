import { OAuth2Client } from "google-auth-library";

export type GoogleTokenResponse = {
    access_token: string;
    expires_in: number;
    id_token: string;
    scope: string;
    token_type: string;
    refresh_token?: string;
};

export type GoogleProfile = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    email_verified: boolean;
    picture?: string;
};

export function buildGoogleAuthUrl(state: string) {
    const url = new URL(
        "https://accounts.google.com/o/oauth2/v2/auth"
    );

    url.searchParams.set(
        "client_id",
        process.env.GOOGLE_CLIENT_ID!
    );

    url.searchParams.set(
        "redirect_uri",
        process.env.GOOGLE_REDIRECT_URI!
    );

    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "openid email profile");
    url.searchParams.set("state", state);
    url.searchParams.set("access_type", "offline");
    url.searchParams.set("prompt", "select_account");

    return url;

}

export async function exchangeCodeForTokens(code: string): Promise<GoogleTokenResponse> {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
            grant_type: 'authorization_code'
        })
    })

    if (!tokenResponse.ok) {
        const errorResponse = await tokenResponse.json()

        throw new Error(
            `Google OAuth error: ${errorResponse.error} - ${errorResponse.error_description}`
        )
    }

    return tokenResponse.json()
}

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

export async function verifyGoogleIdToken(idToken: string): Promise<GoogleProfile> {
    const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    if (!payload || !payload.email || !payload.sub) {
        throw new Error('Invalid google user')
    }

    if (!payload.email_verified) {
        throw new Error('Email not verified')
    }

    return {
        id: payload.sub,
        email: payload.email,
        firstName: payload.given_name ?? '',
        lastName: payload.family_name ?? '',
        email_verified: payload.email_verified,
        picture: payload.picture
    }
}