import Link from 'next/link';

export default function Header() {
    return (
        <header className='bg-rose-100 text-stone-900 border-b border-rose-200 py-4 shadow-md'>
            <div className='max-w-4xl mx-auto px-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
                <div id='header-title' className='text-2xl font-bold'>Rebeca Arredondo</div>
                <nav>
                    <ul className='flex gap-6'>
                        <li><Link href='/' className='hover:underline'>Home</Link></li>
                        <li><Link href='/about' className='hover:underline'>About</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}