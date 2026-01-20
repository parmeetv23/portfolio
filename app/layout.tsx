import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://parmeetvirdi.com'),
    title: {
        default: 'Parmeet Virdi | Backend / Distributed Systems / Applied ML',
        template: '%s | Parmeet Virdi',
    },
    description: 'Portfolio of Parmeet Virdi - Backend engineer specializing in distributed systems, fault tolerance, and applied machine learning.',
    keywords: ['backend engineering', 'distributed systems', 'machine learning', 'fault tolerance', 'systems engineering'],
    authors: [{ name: 'Parmeet Virdi' }],
    creator: 'Parmeet Virdi',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/',
        siteName: 'Parmeet Virdi',
        title: 'Parmeet Virdi | Backend / Distributed Systems / Applied ML',
        description: 'Portfolio of Parmeet Virdi - Backend engineer specializing in distributed systems, fault tolerance, and applied machine learning.',
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
}

export default function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}

