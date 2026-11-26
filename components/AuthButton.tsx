import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function AuthButton() {
    const session = await auth();

    if (!session?.user) {
        return <Link href="/login" className="hover:text-rose-700">Sign in</Link>;
    }

    return (        
        <form 
            action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
            }}
        >

        <button type="submit" className="hover:text-rose-700">Sign Out</button>
        </form>
    );
}