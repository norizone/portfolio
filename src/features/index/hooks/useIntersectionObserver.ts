import { loadedPage } from '@/stores/worksStates'
import { useAtomValue } from 'jotai'
import { RefObject, useCallback, useEffect, useRef } from 'react'

const observerOptions = {
  root: null,
  rootMargin: '50% 0px',
  threshold: 1.0,
}

export const useIntersectionObserver = ({
  totalPages,
  onChangePage,
  isLoading,
}: {
  totalPages: number
  onChangePage: () => void
  isLoading: boolean
}) => {
  const currentPage = useAtomValue(loadedPage)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (isLoading || currentPage >= totalPages) return
        if (entry.isIntersecting) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          timeoutRef.current = setTimeout(() => {
            observer.unobserve(entry.target)
            onChangePage()
          }, 1000)
        } else {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
          }
        }
      })
    },
    [onChangePage, currentPage, totalPages, isLoading]
  )

  const handleObserve = useCallback(
    (targetRef: RefObject<HTMLButtonElement>) => {
      if (observerRef.current) observerRef.current.disconnect()
      const observer = new IntersectionObserver(
        handleIntersection,
        observerOptions
      )

      observerRef.current = observer
      if (targetRef.current) {
        observer.observe(targetRef.current)
      }

      if (currentPage >= totalPages || isLoading) {
        observer.disconnect()
      }
    },
    [handleIntersection, currentPage, totalPages, isLoading]
  )

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    handleObserve,
  }
}
