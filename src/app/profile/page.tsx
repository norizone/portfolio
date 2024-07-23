import clsx from 'clsx'
import type { Metadata } from 'next'

import './profile.scss'
import { BackToTop } from '@/components/elements/btn/backToTop/BackToTop'
import { PrimaryFooter } from '@/components/layouts/footer/PrimaryFooter'
import { NumberingHeadLine } from '@/components/elements/headline/numberingHeadline/NumberingHeadline'
import { ContactForm } from '@/features/profile/components/contactForm/ContactForm'
import MotionWrap from '@/components/layouts/wrap/MotionWrap'
import { SetActive } from '@/features/profile/hooks/SetActive'

export const metadata: Metadata = {
  title: 'profile',
}

const Profile = () => {
  const skills = [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Vue',
    'Nuxt.js',
    'Astro',
    'scss',
    'WebAudio(tone.js)',
    'WebGL(Three.js)',
    'GSAP',
    'vite',
    'webpack',
    'PHP',
    'CodeIgniter',
    'WordPress',
    'docker',
    'GitHub',
    'GitLab',
  ]
  return (
    <MotionWrap>
      <div className={clsx('l-wrap', '-secondary')}>
        <BackToTop />
        <section className="contents">
          <NumberingHeadLine numbering={1} text={'profile'} tag={'h1'} />
          <p className="contents__text">
            My name is <br />
            MINAMI TAKANORI.
            <br />
            I&apos;m FRONT-END <br className="sp" />
            DEVELOPER. <br />
          </p>
          <dl className="contents__data">
            <dt className="contents__data-label upper">skill</dt>
            <dd className="contents__data-desc">{skills.join(' / ')}</dd>
          </dl>
        </section>
        <section className="contact" id="contact">
          <NumberingHeadLine numbering={2} text={'contact'} tag={'h1'} />
          <div className="contact__form">
            <ContactForm />
          </div>
        </section>
        <PrimaryFooter />
      </div>
    </MotionWrap>
  )
}
export default Profile
