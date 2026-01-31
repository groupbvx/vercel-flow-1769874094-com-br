import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Scripts } from '@/components/Scripts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyFooterAd } from '@/components/ads/StickyFooterAd';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'TechPulse Daily - Your Daily Dose of Tech Innovation',
    template: '%s | TechPulse Daily',
  },
  description:
    'TechPulse Daily delivers cutting-edge technology news, software reviews, tutorials, and insights into the digital world.',
  metadataBase: new URL('https://vercel-flow-1769874094.com.br'),
  keywords: [
    'technology',
    'tech news',
    'software',
    'AI',
    'machine learning',
    'development',
    'tutorials',
    'reviews',
  ],
  authors: [{ name: 'TechPulse Daily' }],
  creator: 'TechPulse Daily',
  publisher: 'TechPulse Daily',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vercel-flow-1769874094.com.br',
    siteName: 'TechPulse Daily',
    title: 'TechPulse Daily - Your Daily Dose of Tech Innovation',
    description:
      'TechPulse Daily delivers cutting-edge technology news, software reviews, tutorials, and insights into the digital world.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TechPulse Daily',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechPulse Daily - Your Daily Dose of Tech Innovation',
    description:
      'TechPulse Daily delivers cutting-edge technology news, software reviews, tutorials, and insights into the digital world.',
    images: ['/og-image.png'],
    creator: '@techpulsedaily',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className="font-body antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        {/* Analytics & Ads Scripts */}
        <Scripts />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <Footer />

        {/* Sticky Footer Ad */}
        <StickyFooterAd />
      </body>
    </html>
  );
}
