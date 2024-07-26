'use client'
import Link from 'next/link'
import styles from './PrimaryHeader.module.scss'
import { useAtomValue } from 'jotai'
import { userId } from '@/stores/worksStates'
import { useLogout } from '@/hooks/useLogout'

export const PrimaryHeader = () => {
  const permission = useAtomValue(userId)
  const { onLogout } = useLogout()


  return (
    <header className={styles.header}>
      <Link className="upper" href={'/'} prefetch={true}>
        MINAMI
        <br />
        TAKANORI
      </Link>
      <div className={styles.header__links}>
        <Link className="upper" href={'/profile'} prefetch={true}>
          Profile
        </Link>
        {permission === null || permission === 0 ? (
          <Link className="upper" href={'/login'} >
            Log in
          </Link>
        ) : (
          <button className="upper" type="button" onClick={onLogout}>
            Log out
          </button>
        )}
      </div>
    </header>
  )
}
