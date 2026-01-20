import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://parmeetvirdi.com'),
    title: {
        default: 'Parmeet Singh Virdi | Backend / Distributed Systems / Applied ML',
        template: '%s | Parmeet Singh Virdi',
    },
    description: 'Portfolio of Parmeet Singh Virdi - Backend engineer specializing in distributed systems, fault tolerance, and applied machine learning.',
    keywords: ['backend engineering', 'distributed systems', 'machine learning', 'fault tolerance', 'systems engineering'],
    authors: [{ name: 'Parmeet Singh Virdi' }],
    creator: 'Parmeet Singh Virdi',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/',
        siteName: 'Parmeet Singh Virdi',
        title: 'Parmeet Singh Virdi | Backend / Distributed Systems / Applied ML',
        description: 'Portfolio of Parmeet Singh Virdi - Backend engineer specializing in distributed systems, fault tolerance, and applied machine learning.',
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

