import clsx from 'clsx'
import type { Metadata } from 'next'

// import "./profile.scss";
import { BackToTop } from '@/components/elements/btn/BackToTop'
import { PrimaryFooter } from '@/components/layouts/footer/PrimaryFooter'
import { NumberingHeadLine } from '@/features/profile/components/numberingHeadline/NumberingHeadline'
import { ContactForm } from '@/features/profile/components/contactForm/ContactForm'
import MotionWrap from '@/components/layouts/wrap/MotionWrap'
import { SetActive } from '@/features/profile/hooks/SetActive'

export const metadata: Metadata = {
  title: 'login',
}

const Profile = () => {
  return (
    <MotionWrap>
      <SetActive />
      <div className={clsx('l-wrap', '-secondary')}>
        <BackToTop />
        <section className="contents">
          <h1>login</h1>
        </section>
        <PrimaryFooter />
      </div>
    </MotionWrap>
  )
}
export default Profile
