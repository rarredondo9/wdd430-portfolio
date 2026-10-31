export default async function Footer() {
    'use cache';

    return (
        <footer className="bg-stone-700 text-stone-50 py-4 mt-12">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <p>Copyright &copy; {new Date().getFullYear()} | Rebeca Arredondo | All rights reserved </p>
            </div>
        </footer>
    );
}