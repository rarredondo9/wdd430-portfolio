import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Rebeca Arredondo | Portfolio',
    template: '%s | Rebeca Arredondo',
  },
  description: 'Web development portfolio of Rebeca Arredondo, built with Next.js, React and TypeScript.',
  metadataBase: new URL('https://wdd430-portfolio-six-alpha.vercel.app/')
};

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-stone-50 text-stone-900 min-h-screen flex flex-col' suppressHydrationWarning>
        <Header />
        <div className='flex-1'>{children}</div>
        <Footer />
      </body>
    </html>
  );
}