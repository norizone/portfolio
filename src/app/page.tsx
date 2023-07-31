import type { Metadata } from "next";

import { ListWorks } from '@/types/works';
import { IndexPage } from '@/features/index/components/indexPage/IndexPage';
import MotionWrap from "@/components/layouts/wrap/MotionWrap";

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

export const getWorks= async() =>{
  const uri = process.env.API_URL;
  const secretKey = process.env.API_KEY;
  const url = new URL(uri+'');
  url.searchParams.set("orders", "-publishedAt");
  url.searchParams.set("fields", "id,title_en,archive_img,use_tools");
  url.searchParams.set("offset", '0');
  url.searchParams.set("limit", '5');
  const response = await fetch(
    url.href,
    {headers: { "X-MICROCMS-API-KEY": secretKey+'' }}
    );
  const data:ListWorks = await response.json();
  return data
}

const Home = async() => {
  const data = await getWorks();
  const {contents,totalCount} = data;
  return (
    <MotionWrap>
      <IndexPage contents={contents} totalCount={totalCount}/>
    </MotionWrap>
  )
}

export default Home;