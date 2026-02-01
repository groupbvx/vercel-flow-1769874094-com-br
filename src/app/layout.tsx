import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Scripts } from '@/components/Scripts';
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
  description: 'TechPulse Daily delivers cutting-edge technology news, software reviews, tutorials, and insights into the digital world.',
  metadataBase: new URL('https://vercel-flow-1769874094.com.br'),
  keywords: ['technology', 'software', 'tutorials', 'reviews', 'AI', 'machine learning', 'development', 'cloud computing'],
  authors: [{ name: 'TechPulse Daily' }],
  creator: 'TechPulse Daily',
  publisher: 'TechPulse Daily',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vercel-flow-1769874094.com.br',
    siteName: 'TechPulse Daily',
    title: 'TechPulse Daily - Your Daily Dose of Tech Innovation',
    description: 'TechPulse Daily delivers cutting-edge technology news, software reviews, tutorials, and insights into the digital world.',
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
    title: 'TechPulse Daily',
    description: 'Your Daily Dose of Tech Innovation',
    creator: '@techpulsedaily',
    images: ['/og-image.png'],
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
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="font-body antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        {/* PostHog and Revive Scripts */}
        <Scripts />
        
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Sticky Footer Ad */}
        <StickyFooterAd />
        
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'TechPulse Daily',
              url: 'https://vercel-flow-1769874094.com.br',
              logo: 'https://vercel-flow-1769874094.com.br/logo.svg',
              sameAs: [],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                email: 'contact@techpulsedaily.com',
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
