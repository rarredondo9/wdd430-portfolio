'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/', label: 'Home'},
    { href: '/about', label: 'About'},
    { href: '/projects', label: 'Projects'},
    { href: '/contact', label: 'Contact'},
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav aria-label='Primary'>
            <ul className='flex flex-row flex-wrap items-center gap-6'>
                {links.map((link) => {
                    const isActive = 
                        link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

                        return(
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={
                                        isActive
                                        ? 'active font-bold text-rose-700'
                                        : 'hover:text-rose-700'
                                    }
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                })}
            </ul>
        </nav>
    );
}