import { RefObject } from 'react'

const observerOptions = {
  root: null,
  rootMargin: '50% 0px',
  threshold: 0,
}

export const useIntersectionObserver = ({
  totalPages,
  onChangePage,
  page,
}: {
  totalPages: number
  onChangePage: () => void
  page: number
}) => {
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) onChangePage()
    })
  }

  const handleObserve = (targetRef: RefObject<HTMLDivElement>) => {
    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    )
    targetRef.current && observer.observe(targetRef.current)
    totalPages === page && observer.disconnect()
    return () => {
      observer.disconnect()
    }
  }

  return {
    handleObserve,
  }
}
