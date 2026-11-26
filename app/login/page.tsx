import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
    return (
        <main className="mx-auto max-w-sm px-4 py-16">
            <h1 className="mb-6 text-3xl font-bold">Sign In</h1>
            <LoginForm />
        </main>
    );
}