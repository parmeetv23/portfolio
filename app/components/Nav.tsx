import Link from 'next/link'

export default function Nav() {
    return (
        <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link href="/" className="text-xl font-semibold text-foreground hover:text-accent transition-colors">
                        Parmeet Virdi
                    </Link>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                            Home
                        </Link>
                        <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                            Projects
                        </Link>
                        <Link href="/experience" className="text-muted-foreground hover:text-foreground transition-colors">
                            Experience
                        </Link>
                        <Link href="/resume" className="text-muted-foreground hover:text-foreground transition-colors">
                            Resume
                        </Link>
                        <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

