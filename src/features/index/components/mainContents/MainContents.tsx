'use client'
import Image from "next/image"
import { useLayoutEffect, useRef ,type FC, useEffect} from "react"
import Link from "next/link"
import clsx from "clsx"
import { useRecoilState } from "recoil"

import styles from "./MainContents.module.scss"
import { activeWorkState,loadedImagesState } from "@/stores/worksStates"
import type {ListWorksContents} from "@/types/works"
import { useScrollToTarget } from "../../hooks/useScrollToTarget"

type Props = {
  contents:ListWorksContents;
  contentsIndex : number;
  isScrollTarget?:boolean
}

let loadedArray:Array<number> = []

export const MainContents:FC<Props> = (props) =>{
  const {contents ,contentsIndex,isScrollTarget} = props;
  const targetRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null)
  const [_,setActiveWork] = useRecoilState(activeWorkState);
  const [loadedImages,setLoadedImages] = useRecoilState(loadedImagesState)
  const { onScrollToTarget} = useScrollToTarget()
  useEffect(()=>{
    return (()=>{
      loadedArray = []
    })
  },[])

  useLayoutEffect(()=>{
    if(!targetRef.current)return
    isScrollTarget&&onScrollToTarget(targetRef.current)
    targetRef.current && observer()
  },[targetRef])

  const setLoadedImage = () =>{
    if(loadedArray.every(num => num !== contentsIndex-1 )){
      loadedArray = [...loadedArray,contentsIndex-1]
       setLoadedImages(loadedArray)
    }
  }

  const scrollCallback = (entries:IntersectionObserverEntry[])=> {
    entries.forEach((el) => {
      if (el.isIntersecting) {
        setActiveWork(contentsIndex)
        if(contents.id === 'dummy')return;
        setTimeout(() => {
          setLoadedImage();
        }, 300);
        targetRef.current && targetRef.current?.classList.add(styles.active)
      }else{
        if(contents.id === 'dummy')return;
        targetRef.current && targetRef.current?.classList.remove(styles.active)
      }
    });
  }

  const observer = ()=>{
    if(targetRef.current === null)return;
    const options = {
      root: null,
      rootMargin: "-50% 0px",
      threshold: 0,
    };
    new IntersectionObserver(scrollCallback, options).observe(
      targetRef.current
    );
  }

  return(
    <>
    {contents.id === 'dummy'
    ?
    <section 
    className={clsx(styles.topContent , "l-wrap -secondary")}
    ref={targetRef}
    >
      <h1 className={styles.topContent__title}>
        FRONT-END
        <br className="sp" />
        DEVELOPER.
      </h1>
    </section>
    :
    <section
    className={clsx("l-wrap -secondary",styles.content)}
    ref={targetRef}
    id={contents.id}
   >
    <div className={styles.content__header}>
      <h2 className={clsx(styles.content__title,"upper", "js-effectPicTarget")}>
        <Link className={styles["content__title-link"]} 
        href={'works/'+contents.id} 
        dangerouslySetInnerHTML={{__html:contents.title_en}}
        ></Link>
      </h2>
      <Link href={'works/'+contents.id} 
      className={styles.content__pic} >
        <Image 
        className="canvas_img" //webGl 処理用
        src={contents.archive_img.url} 
        height={contents.archive_img.height}
        width={contents.archive_img.width}
        alt=""
        ref={imageRef}
        />
      </Link>
    </div>
    <ul className={styles.content__list}>
     {contents.use_tools.map((el,index)=>(
      <li className={clsx( styles.content__item , "inline-block" )} key={index}>
        {el}{ index + 1 !== contents.use_tools.length ? " / " : "" }
      </li>
     ))}
    </ul>
  </section>
    }
  </>
  )
}