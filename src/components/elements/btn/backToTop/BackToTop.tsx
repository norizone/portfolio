import Link from 'next/link'
import style from './BackToTop.module.scss'

export const BackToTop = () => {
  return (
    <Link
      className={style.btn}
      title="ホームに戻る"
      href={'/'}
      prefetch={true}
    />
  )
}
