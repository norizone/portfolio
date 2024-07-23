import { RefObject, useCallback, useEffect, useRef } from 'react'

const observerOptions = {
  root: null,
  rootMargin: '50% 0px',
  threshold: 1.0,
}

export const useIntersectionObserver = ({
  totalPages,
  onChangePage,
  page,
  isLoading,
}: {
  totalPages: number
  onChangePage: () => void
  page: number
  isLoading: boolean
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  console.log(page, totalPages)
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (isLoading || page === totalPages) return
        if (entry.isIntersecting) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          timeoutRef.current = setTimeout(() => {
            observer.unobserve(entry.target)
            onChangePage()
            console.log('in')
          }, 1000) // 遅延時間を調整する
        } else {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
          }
        }
      })
    },
    [onChangePage, page, totalPages, isLoading]
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

      if (page >= totalPages || isLoading) {
        observer.disconnect()
      }
    },
    [handleIntersection, page, totalPages, isLoading]
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
