import clsx from 'clsx'
import type { Metadata } from 'next'
import './login.scss'
import { BackToTop } from '@/components/elements/btn/backToTop/BackToTop'
import MotionWrap from '@/components/layouts/wrap/MotionWrap'
import { LoginForm } from '@/features/login/components/loginForm/LoginForm'
import { cookies } from 'next/headers'
import axios from 'axios'
import { authApiUrl, baseURL } from '@/utils/apiUrl'
import { redirect } from 'next/navigation'
import { routers } from '@/routers/routers'

export const metadata: Metadata = {
  title: 'login',
}

const getAuth = async () => {
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  let user
  try {
    const res = await axios.get(`${baseURL}${authApiUrl.default}`, {
      headers: { cookie },
    })
    if (res.data) {
      user = res.data.userId
    } else {
      user = null
    }
  } catch (error) {
    user = null
  }
  return user
}

const Profile = async () => {
  const user = await getAuth();
  if (user) {
    redirect(routers.HOME);
  }
  return (
    <MotionWrap>
      <div className={clsx('l-wrap', '-secondary')}>
        <BackToTop />
        <section className="login">
          <div className="login__wrap">
            <h1 className="login__headline">
              Please log in <br />
              to view the actual case.
            </h1>
            <div className="login__form">
              <LoginForm />
            </div>
          </div>
        </section>
      </div>
    </MotionWrap>
  )
}
export default Profile
