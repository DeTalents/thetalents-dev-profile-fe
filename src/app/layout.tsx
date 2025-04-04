import { AntdProvider } from '@/components/global/AntiProvider';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import { Providers } from './providers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'TheTalents',
  description: 'Hiring platform, we tedious work for you.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AntdRegistry>
            <AntdProvider>
              {children}
              <ToastContainer />
            </AntdProvider>
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
