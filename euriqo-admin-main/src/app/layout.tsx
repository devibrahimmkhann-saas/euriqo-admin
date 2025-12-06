import type { Metadata } from "next";
import 'react-perfect-scrollbar/dist/css/styles.css';
import './globals.css';
import ProviderComponent from '@/components/layouts/provider-component';
import { Nunito } from 'next/font/google';

export const metadata: Metadata = {
  title: {
    template: '%s | Euriqo Admin',
    default: 'Euriqo Admin - AI Voice Assistant Dashboard',
  },
  description: 'Euriqo Admin Dashboard for AI Voice Assistant Management',
};

const nunito = Nunito({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <ProviderComponent>{children}</ProviderComponent>
      </body>
    </html>
  );
}
