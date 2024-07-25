'use client'
import Link from 'next/link'
import { useAtomValue } from 'jotai'
import { userId } from '@/stores/worksStates'

export const AuthBtn = () => {
  const permission = useAtomValue(userId)

  return (
    <>
      {permission ? (
        <button className="upper" type="button">
          Logout
        </button>
      ) : (
        <Link className="upper" href={'/login'}>
          Login
        </Link>
      )}
    </>
  )
}