import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
};

export const metadata: Metadata = {
  title: 'NASA 3D COSMOS — Interactive Space Digital Twin & Mission Explorer',
  description:
    'Explore NASA hardware and space science in a living 3D universe. Search it, inspect it, learn it, compare it, and build your own mission.',
  keywords: ['NASA', '3D', 'space', 'spacecraft', 'exploration', 'Three.js', 'WebGL'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#0a0a0f] text-gray-100 antialiased">
        <Providers>
          <Header />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
