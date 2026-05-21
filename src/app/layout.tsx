import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'GLOBE Assistant — Erasmus Mundus Mobility Guide',
  description: 'Interactive guide for GLOBE Erasmus Mundus students covering visa requirements, accommodation, transport, SIM cards, and residence permits for Spain, UK, Mexico, and Portugal.',
  keywords: 'Erasmus Mundus, GLOBE, visa checker, student mobility, URJC, Bangor University, UATx',
  openGraph: {
    title: 'GLOBE Assistant',
    description: 'Your complete guide to GLOBE Erasmus Mundus mobility',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased" style={{ background: 'var(--page-bg)' }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
