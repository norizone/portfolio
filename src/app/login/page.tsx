import clsx from 'clsx'
import type { Metadata } from 'next'

import './login.scss'
import { BackToTop } from '@/components/elements/btn/backToTop/BackToTop'
import MotionWrap from '@/components/layouts/wrap/MotionWrap'
// import { SetActive } from '@/features/profile/hooks/SetActive'
import { LoginForm } from '@/features/login/components/loginForm/LoginForm'

export const metadata: Metadata = {
  title: 'login',
}

const Profile = () => {
  return (
    <MotionWrap>
      {/* <SetActive /> */}
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
