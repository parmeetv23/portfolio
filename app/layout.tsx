import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
    title: 'Parmeet Singh Virdi | Backend / Distributed Systems / Applied ML',
    description: 'Portfolio of Parmeet Singh Virdi - Backend engineer specializing in distributed systems, fault tolerance, and applied machine learning.',
    keywords: ['backend engineering', 'distributed systems', 'machine learning', 'fault tolerance', 'systems engineering'],
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

