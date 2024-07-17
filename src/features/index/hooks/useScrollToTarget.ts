export const useScrollToTarget = () => {
  const onScrollToTarget = (target: HTMLElement) => {
    target.scrollIntoView({
      block: 'center',
      behavior: 'instant',
    })
  }
  return { onScrollToTarget }
}
