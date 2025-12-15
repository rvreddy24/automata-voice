import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AutomataVoice - AI Receptionist for Modern Businesses',
  description: 'Never miss a customer call again. Our AI receptionist answers 24/7, qualifies leads, and books appointments. Costs 10% of a human salary.',
  keywords: ['AI receptionist', 'virtual receptionist', 'phone answering service', 'appointment booking', 'lead qualification'],
  openGraph: {
    title: 'AutomataVoice - AI Receptionist for Modern Businesses',
    description: 'Never miss a customer call again. Our AI receptionist answers 24/7, qualifies leads, and books appointments.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
