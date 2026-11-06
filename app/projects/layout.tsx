import Link from 'next/link';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='max-w-4xl mx-auto px-4 py-12'>
            <nav aria-label='Projects' className='mb-8 border-b border-rose-200 pb-4'>
                <ul className='flex flex-wrap gap-6'>
                    <li><Link href='/projects' className='text-rose-700 hover:underline'>Overview</Link></li>
                    <li><Link href='/projects/opensource' className='text-rose-700 hover:underline'>Open Source</Link></li>
                    <li><Link href='/projects/school' className='text-rose-700 hover:underline'>School</Link></li>
                </ul>
            </nav>
            {children}
        </main>
    );
}