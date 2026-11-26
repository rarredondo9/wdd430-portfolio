'use client'

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";

const inputClass = 'w-full rounded-md border border-stone-500 bg-white px-3 py-2 text-stone-900 focus:border-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300';

export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <form action={formAction} className="space-y-4">
            <div>
                <label htmlFor="email" className="mb-1 block font-semibold">Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
            </div>
            <div>
                <label htmlFor="password" className="mb-1 block font-semibold">Password</label>
                <input id="password" name="password" type="password" required minLength={6} autoComplete="current-password" className={inputClass} />
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-md bg-rose-700 px-4 py-2 font-semibold text-white hover:bg-rose-800 disabled:opacity-60"
                >
                    {isPending ? 'Signing in...' : 'Sign In'}
                </button>
                {errorMessage && <p role="alert" className="text-red-700">{errorMessage}</p>}
        </form>
    );
}