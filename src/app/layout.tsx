import { CookieBanner } from '@/components/cookie-banner'
import { SanityLive } from '@/sanity/live'
import { revalidateSyncTags } from '@/sanity/revalidateSyncTags'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s - Maxsoft AG',
    default: 'Maxsoft AG - Your Partner for Innovative IT Solutions',
  },
  description:
    'Maxsoft AG offers customized IT solutions for companies of all sizes. Instead of leaving you to deal with complex, incomprehensible technologies, we offer clear, actionable strategies that optimize your IT processes. We understand that technology is constantly evolving and help you keep pace with the latest innovations to increase your competitiveness. We offer you the flexibility to customize your IT.',
  keywords: [
    'IT consultancy',
    'digital transformation',
    'technology consulting',
    'cloud solutions',
    'cybersecurity',
    'Maxsoft AG',
    'innovative IT solutions',
    'IT optimization',
  ],
  authors: [{ name: 'Maxsoft AG' }],
  creator: 'Maxsoft AG',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://maxsoft.ag',
    title: 'Maxsoft AG - Your Partner for Innovative IT Solutions',
    description:
      'Maxsoft AG offers customized IT solutions for companies of all sizes. Instead of leaving you to deal with complex, incomprehensible technologies, we offer clear, actionable strategies that optimize your IT processes.',
    siteName: 'Maxsoft AG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maxsoft AG - Your Partner for Innovative IT Solutions',
    description:
      'Maxsoft AG offers customized IT solutions for companies of all sizes. Instead of leaving you to deal with complex, incomprehensible technologies, we offer clear, actionable strategies that optimize your IT processes.',
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
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="The Maxsoft AG Blog"
          href="/blog/feed.xml"
        />
      </head>
      <body className="text-gray-950 antialiased">
        {children}
        <SanityLive revalidateSyncTags={revalidateSyncTags} />
        <CookieBanner />
      </body>
    </html>
  )
}
