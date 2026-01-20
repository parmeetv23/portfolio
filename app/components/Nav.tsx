import Link from 'next/link'

export default function Nav() {
    return (
        <nav className="border-b border-[#262626] bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-xl font-semibold text-[#e5e5e5] hover:text-[#3b82f6] transition-colors">
                        Parmeet Singh Virdi
                    </Link>
                    <div className="flex gap-6">
                        <Link href="/" className="text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors">
                            Home
                        </Link>
                        <Link href="/projects" className="text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors">
                            Projects
                        </Link>
                        <Link href="/#contact" className="text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

