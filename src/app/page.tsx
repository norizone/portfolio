import type { Metadata } from 'next'
import { IndexPage } from '@/features/index/components/indexPage/IndexPage'
import MotionWrap from '@/components/layouts/wrap/MotionWrap'
import { cookies } from 'next/headers'
import axios from 'axios'
import { baseURL, workApiUrl } from '@/utils/apiUrl'
import { WorkListRes } from '@/types/api/front'
import { DEFAULT_PAGE, PAGE_SIZE } from '@/utils/const'

export const metadata: Metadata = {
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

const getWorkList = async (): Promise<WorkListRes> => {
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const res = await axios.post(
      `${baseURL}${workApiUrl.list()}`,
      {
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE,
      },
      {
        headers: { cookie },
      }
    )
    return res.data
  } catch (error) {
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
    }
  }
}

export default async function Home() {
  const data = await getWorkList()
  return (
    <MotionWrap>
      <IndexPage
        SSRData={data}
        pageSize={PAGE_SIZE}
      />
    </MotionWrap>
  )
}
