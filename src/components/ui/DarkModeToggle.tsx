import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

export default function DarkModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  return (
    <button
      onClick={cycleTheme}
      className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      title={
        theme === 'light' 
          ? 'Modo claro' 
          : theme === 'dark' 
          ? 'Modo escuro' 
          : 'Seguir sistema'
      }
      aria-label="Alternar tema"
    >
      <Sun className={cn(
        'h-5 w-5 transition-all',
        resolvedTheme === 'light' && theme !== 'system' ? 'block' : 'hidden'
      )} />
      <Moon className={cn(
        'h-5 w-5 transition-all',
        resolvedTheme === 'dark' && theme !== 'system' ? 'block' : 'hidden'
      )} />
      <Monitor className={cn(
        'h-5 w-5 transition-all',
        theme === 'system' ? 'block' : 'hidden'
      )} />
    </button>
  )
}
