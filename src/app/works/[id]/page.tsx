import { clsx } from 'clsx'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BackToTop } from '@/components/elements/btn/backToTop/BackToTop'
import { PrimaryFooter } from '@/components/layouts/footer/PrimaryFooter'
import { ArticleContent } from './_components/articleContents/ArticleContents'
import { NextContents } from './_components/nextContents/NextContents'
import MotionWrap from '@/components/layouts/wrap/MotionWrap'
import { cookies } from 'next/headers'
import axios from 'axios'
import { baseURL, workApiUrl } from '@/utils/apiUrl'
import { DetailWorkRes } from '@/types/api/front'
import { SetCurrent } from '@/features/works/components/setCurrent/SetCurrent'

type Props = {
  params: { id: string }
}

const getWork = async (id: number): Promise<DetailWorkRes> => {
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const res = await axios.get(`${baseURL}${workApiUrl.detail(id)}`, {
      headers: { cookie },
    })
    return res.data
  } catch (error) {
    notFound()
  }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const id = params.id
  const product = await getWork(Number(id))
  const { item } = product
  return {
    title: `制作実績 | ${item.title}`,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

const WorksPage = async ({ params }: { params: { id: string } }) => {
  const data: DetailWorkRes = await getWork(Number(params.id))
  const { item, nextContents } = data
  return (
    <>
      <SetCurrent pageId={item.id} />
      {item && <ArticleContent item={item} />}
      {nextContents && <NextContents contents={nextContents} />}
    </>
  )
}

export default WorksPage
