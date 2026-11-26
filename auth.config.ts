import type { NextAuthConfig } from "next-auth";

function isProtectedPath(pathname: string): boolean {
    return pathname === '/projects/create' || /^\/projects\/[^/]+\/edit$/.test(pathname);
}

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            if (isProtectedPath(nextUrl.pathname)) {
                return isLoggedIn;
            }

            if (isLoggedIn && nextUrl.pathname === '/login') {
                return Response.redirect(new URL('/projects', nextUrl));
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;