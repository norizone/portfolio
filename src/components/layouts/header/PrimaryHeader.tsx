import Link from 'next/link'
import styles from  './PrimaryHeader.module.scss'

export const PrimaryHeader = () =>{
  return (
    <header className={styles.header}>
      <Link className='upper' href={"/"} prefetch={true}>MINAMI<br />TAKANORI</Link>
      <Link className='upper' href={"/profile"} prefetch={true}>Profile</Link>
  </header>
  )
}