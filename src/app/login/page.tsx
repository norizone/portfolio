import clsx from 'clsx'
import type { Metadata } from 'next'

import './login.scss'
import { BackToTop } from '@/components/elements/btn/backToTop/BackToTop'
import { PrimaryFooter } from '@/components/layouts/footer/PrimaryFooter'
import { NumberingHeadLine } from '@/components/elements/headline/numberingHeadline/NumberingHeadline'
import MotionWrap from '@/components/layouts/wrap/MotionWrap'
import { SetActive } from '@/features/profile/hooks/SetActive'
import { LoginForm } from '@/features/login/components/loginForm/LoginForm'

export const metadata: Metadata = {
  title: 'login',
}

const Profile = () => {
  return (
    <MotionWrap>
      <SetActive />
      <div className={clsx('l-wrap', '-secondary')}>
        <BackToTop />
        <section className="login">
          <NumberingHeadLine tag="h1" text={'login'} />
          <div className="login__form">
            <LoginForm />
          </div>
        </section>
        <PrimaryFooter />
      </div>
    </MotionWrap>
  )
}
export default Profile
