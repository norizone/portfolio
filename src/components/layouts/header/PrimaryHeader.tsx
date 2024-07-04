import Link from 'next/link'
import styles from './PrimaryHeader.module.scss'

export const PrimaryHeader = () => {
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
        {/* <Link className='upper' href={"/"}>Login</Link> */}
      </div>
    </header>
  )
}
