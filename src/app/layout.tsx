import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Component as ScrollNavbar } from '@/components/ui/scroll-navigation-menu';
import { Footer2 } from '@/components/ui/shadcnblocks-com-footer2';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AGRYEN | Innovating Across Industries',
  description: 'Smart Solutions For Modern Businesses. Multiple Divisions. One Global Standard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <ScrollNavbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer2 />
      </body>
    </html>
  );
}
