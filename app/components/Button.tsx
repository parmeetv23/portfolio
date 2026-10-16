import Link from 'next/link'
import type { MouseEventHandler, ReactNode } from 'react'

interface BaseButtonProps {
    children: ReactNode
    variant?: 'primary' | 'secondary'
    className?: string
}

type ButtonProps = BaseButtonProps & (
    | {
        href: string
        external?: boolean
        onClick?: never
    }
    | {
        href?: never
        external?: never
        onClick?: MouseEventHandler<HTMLButtonElement>
    }
)

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

