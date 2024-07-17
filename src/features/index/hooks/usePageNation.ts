import { RefObject, useState } from 'react'

const observerOptions = {
  root: null,
  rootMargin: '50% 0px',
  threshold: 0,
}

export const usePageNation = ({
  totalPages,
  setPage:
}: {
  totalPages: number
}) => {

  const onChangePage = () =>
    setPage((prevCount) =>
      prevCount < totalPages ? prevCount + 1 : totalPages
    )

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
    page,
    setPage,
    handleObserve,
  }
}
