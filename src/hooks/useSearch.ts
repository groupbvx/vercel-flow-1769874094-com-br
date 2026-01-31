import { useState, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { debounce } from '@/lib/utils'

export function useSearch() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [isOpen, setIsOpen] = useState(false)

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.trim().length >= 2) {
        navigate(`/busca?q=${encodeURIComponent(value.trim())}`)
        setIsOpen(false)
      }
    }, 300),
    [navigate]
  )

  const handleSearch = (value: string) => {
    setQuery(value)
    debouncedSearch(value)
  }

  const submitSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (query.trim().length >= 2) {
      navigate(`/busca?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
    }
  }

  const openSearch = () => setIsOpen(true)
  const closeSearch = () => setIsOpen(false)
  const toggleSearch = () => setIsOpen((prev) => !prev)

  return {
    query,
    setQuery: handleSearch,
    submitSearch,
    isOpen,
    openSearch,
    closeSearch,
    toggleSearch,
  }
}
