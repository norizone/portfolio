import { clsx } from 'clsx'
import { BackToTop } from '@/components/elements/btn/backToTop/BackToTop'
import { PrimaryFooter } from '@/components/layouts/footer/PrimaryFooter'
import MotionWrap from '@/components/layouts/wrap/MotionWrap'

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MotionWrap>
      <div className={clsx('l-wrap', '-primary')}>
        <BackToTop />
        {children}
        <PrimaryFooter />
      </div>
    </MotionWrap>
  )
}