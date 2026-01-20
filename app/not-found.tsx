import Link from 'next/link'
import Nav from './components/Nav'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Nav />
            <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                <h1 className="text-4xl font-bold mb-4 text-[#e5e5e5]">404</h1>
                <p className="text-xl text-[#a3a3a3] mb-8">Page not found</p>
                <Link
                    href="/"
                    className="text-[#3b82f6] hover:text-[#2563eb] transition-colors"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    )
}

