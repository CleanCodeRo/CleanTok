export const apiDomain = assertValue(
    process.env.NEXT_PUBLIC_API_DOMAIN,
    "Missing environment variable: NEXT_PUBLIC_API_DOMAIN"
);

export const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
        throw new Error(errorMessage);
    }

    return v;
}
