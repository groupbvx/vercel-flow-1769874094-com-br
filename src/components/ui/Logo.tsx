import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  variant?: 'light' | 'dark' | 'auto'
}

export default function Logo({ className, variant = 'auto' }: LogoProps) {
  const { resolvedTheme } = useTheme()

  const isDark = variant === 'dark' || (variant === 'auto' && resolvedTheme === 'dark')

  return (
    <img
      src={isDark ? '/logo-dark.svg' : '/logo.svg'}
      alt="TechPulse Daily"
      className={cn('transition-opacity', className)}
    />
  )
}
