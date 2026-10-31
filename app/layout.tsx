import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Rebeca Arredondo | Portfolio',
  description: 'My WDD430 portfolio built with Next.js',
} ;

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-stone-50 text-stone-900 min-h-screen flex flex-col'>
        <Header />
        <div className='flex-1'>{children}</div>
        <Footer />
      </body>
    </html>
  );
}