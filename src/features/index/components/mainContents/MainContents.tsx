'use client'
import Image from 'next/image'
import { useLayoutEffect, useRef, type FC, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import styles from './MainContents.module.scss'
import { activeWorkState, loadedImagesState } from '@/stores/worksStates'
import { useScrollToTarget } from '../../hooks/useScrollToTarget'
import {
  extractNumberFromUrl,
  heightRegex,
  widthRegex,
} from '@/utils/extractFromUrl'
import { WorkItemRes } from '@/types/api/front'
import { useAtom } from 'jotai'

type Props = {
  contents: WorkItemRes
  contentsIndex: number
  isScrollTarget?: boolean
}

let loadedArray: Array<number> = []

export const MainContents: FC<Props> = (props) => {
  const { contents, contentsIndex, isScrollTarget } = props
  const targetRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [_, setActiveWork] = useAtom(activeWorkState)
  const [loadedImages, setLoadedImages] = useAtom(loadedImagesState)
  const { onScrollToTarget } = useScrollToTarget()
  useEffect(() => {
    return () => {
      loadedArray = []
    }
  }, [])

  useLayoutEffect(() => {
    if (!targetRef.current) return
    isScrollTarget && onScrollToTarget(targetRef.current)
    targetRef.current && observer()
  }, [targetRef])

  const setLoadedImage = () => {
    if (loadedArray.every((num) => num !== contentsIndex - 1)) {
      loadedArray = [...loadedArray, contentsIndex - 1]
      setLoadedImages(loadedArray)
    }
  }

  const scrollCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((el) => {
      if (el.isIntersecting) {
        setActiveWork(contentsIndex)
        if (contents.id === 'dummy') return
        setTimeout(() => {
          setLoadedImage()
        }, 100)
        targetRef.current && targetRef.current?.classList.add(styles.active)
      } else {
        if (contents.id === 'dummy') return
        targetRef.current && targetRef.current?.classList.remove(styles.active)
      }
    })
  }

  const observer = () => {
    if (targetRef.current === null) return
    const options = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0,
    }
    new IntersectionObserver(scrollCallback, options).observe(targetRef.current)
  }

  const renderWorkContents = () => {
    return (
      <>
        <div className={styles.content__header}>
          <h1
            className={clsx(
              styles.content__title,
              'upper',
              'js-effectPicTarget'
            )}
          >
            <Link
              className={styles['content__title-link']}
              href={'works/' + contents.id}
              dangerouslySetInnerHTML={{ __html: contents.titleEn }}
            ></Link>
          </h1>
          <Link href={'works/' + contents.id} className={styles.content__pic}>
            <Image
              className="canvas_img" //webGl 処理用
              src={contents.archiveImg}
              height={extractNumberFromUrl(contents.archiveImg, heightRegex)}
              width={extractNumberFromUrl(contents.archiveImg, widthRegex)}
              loading="eager"
              alt=""
              ref={imageRef}
            />
          </Link>
        </div>
        <ul className={styles.content__list}>
          {contents.useTools.map((el, index) => (
            <li
              className={clsx(styles.content__item, 'inline-block')}
              key={index}
            >
              {el.toolName}
              {index + 1 !== contents.useTools.length ? `/` : ''}
            </li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <section
      className={clsx(
        'l-wrap -secondary',
        contents.id === 'dummy' ? styles.topContent : styles.content
      )}
      ref={targetRef}
      id={`${contents.id}`}
    >
      {contents.id === 'dummy' ? (
        <h1 className={styles.topContent__title}>
          FRONT-END
          <br className="sp" />
          DEVELOPER.
        </h1>
      ) : (
        renderWorkContents()
      )}
    </section>
  )
}
