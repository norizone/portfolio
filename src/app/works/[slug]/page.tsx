import {clsx} from "clsx";
import { notFound } from 'next/navigation'
import type { Metadata } from "next";

import { BackToTop } from "@/components/elements/btn/BackToTop";
import { PrimaryFooter } from "@/components/layouts/footer/PrimaryFooter";
import { ArticleContent } from "@/features/works/components/articleContents/ArticleContents";
import type { Works } from "@/types/works";
import { NextContents } from "@/features/works/components/nextContents/NextContents";
import MotionWrap from "@/components/layouts/wrap/MotionWrap";

type Props = {
  params: { slug: string }
}

const getWork= async(slug:string) =>{
  const uri = process.env.API_URL;
  const secretKey = process.env.API_KEY;
  const url = new URL(uri+'')
  url.searchParams.set("ids", slug);
  url.searchParams.set("offset", '0');
  url.searchParams.set("limit", '1');
  const response = await fetch(
    url.href,
    {headers: { "X-MICROCMS-API-KEY": secretKey+'' }}
    );
  const data:Works = await response.json();
  if (data.contents.length < 1 ) {
    notFound();
  }
  return data
}

export const generateMetadata = async(
  { params }: Props,
): Promise<Metadata>  => {
  const slug = params.slug
  const product = await getWork(slug)
  const {contents} = product
  return {
    title: `制作実績 | ${contents[0].title}`,
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

const WorksPage = async({ params }: { params: { slug: string } }) => {
  const data:Works = await getWork(params.slug);
  return (
    <MotionWrap>
    <div className={clsx("l-wrap","-primary")}>
      <BackToTop />
      {data && 
      <ArticleContent data={data}/>
      }
      <NextContents publishedAt={data.contents[0].publishedAt}/>
      <PrimaryFooter />
    </div>
    </MotionWrap>
  );
};

export default WorksPage;