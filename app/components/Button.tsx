import Link from 'next/link'
import type { ReactNode } from 'react'

interface ButtonProps {
    href?: string
    onClick?: () => void
    children: ReactNode
    variant?: 'primary' | 'secondary'
    external?: boolean
    className?: string
}

export default function Button({
    href,
    onClick,
    children,
    variant = 'secondary',
    external = false,
    className = '',
}: ButtonProps) {
    const baseClasses = 'px-6 py-3 rounded font-medium transition-colors'
    const variantClasses = {
        primary: 'bg-accent text-white hover:bg-accent-hover',
        secondary: 'border border-border text-foreground hover:border-accent hover:text-accent',
    }
    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

    if (href) {
        if (external) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes}
                >
                    {children}
                </a>
            )
        }
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        )
    }

    return (
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    )
}

