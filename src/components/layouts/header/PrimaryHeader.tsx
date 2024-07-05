import Link from 'next/link'
import styles from './PrimaryHeader.module.scss'

type Props = {
  isLogin?: boolean
}

export const PrimaryHeader = (props: Props) => {
  const { isLogin } = props
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
        {isLogin ? (
          <button className="upper" type="button">
            Logout
          </button>
        ) : (
          <Link className="upper" href={'/login'}>
            Login
          </Link>
        )}
      </div>
    </header>
  )
}
