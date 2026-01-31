import { useState, useEffect } from 'react'
import { List } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from content
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headings = doc.querySelectorAll('h2, h3')

    const tocItems: TocItem[] = []
    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`
      tocItems.push({
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      })
    })

    setItems(tocItems)
  }, [content])

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0,
      }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length < 2) return null

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const top = element.offsetTop - 100
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="card p-5">
      <div className="flex items-center space-x-2 mb-4">
        <List className="w-5 h-5 text-primary-500" />
        <h3 className="font-bold text-gray-900 dark:text-gray-100">Índice</h3>
      </div>

      <nav>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={cn(
                  'w-full text-left text-sm py-1.5 px-3 rounded transition-colors',
                  item.level === 3 && 'pl-6',
                  activeId === item.id
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
