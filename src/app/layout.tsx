import type { Metadata } from 'next';
import Providers from '@/app/providers';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Video Highlight Tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
