"use client";
import { useRef, type FC, useState, useEffect, lazy } from "react";
import clsx from "clsx";
import gsap from "gsap";

import styles from "./MockPic.module.scss";
import Image from "next/image";
import desktopMockS from "@/assets/works/desktop-s.webp";
import desktopMock from "@/assets/works/desktop.webp";
import mobileMockS from "@/assets/works/mobile-s.webp";
import mobileMock from "@/assets/works/mobile.webp";
import { useWindowSize } from "@/hooks/useWindoSize";

import type { WorksImg } from "@/types/works";

type Props = {
  device: "desktop" | "mobile";
  images: WorksImg;
  title: string;
};

const mocks = {
  desktop: desktopMock,
  "desktop-s": desktopMockS,
  mobile: mobileMockS,
  "mobile-s": mobileMock,
};

export const MockPic: FC<Props> = (props) => {
  let imgHeight = 0; //スクロール対象の高さ
  let parentHeight = 0; // モックの高さ
  let executionScrollCount = 0; //スクロールさせる回数
  let remainder = 0; //余り
  let scrollRange = 0; // スクロール値
  const { device, images, title } = props;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [timeLine, setTimeLine] = useState<gsap.core.Timeline>();
  const autoScrollParentRef = useRef<HTMLDivElement | null>(null);
  const autoScrollTargetRef = useRef<HTMLDivElement | null>(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (!isLoaded) return;
    timeLine && timeLine.kill();
    setAnimationValues();
    autoScrollEvent();
  }, [windowSize]);

  const onAutoScroll = () => {
    setIsLoaded(true);
    autoScrollTargetRef.current?.style.setProperty("--pic-opacity", "1");
    setAnimationValues();
    autoScrollEvent();
    setTimeout(() => {
      observerScroll();
    }, 100);
  };

  const setAnimationValues = () => {
    imgHeight = autoScrollTargetRef.current?.clientHeight ?? 0; //スライドさせる物
    parentHeight = autoScrollParentRef.current?.clientHeight ?? 0; //モック内部の高さ 表示領域
    scrollRange = (imgHeight - parentHeight) * -1;
    executionScrollCount = Math.floor(imgHeight / parentHeight); //回数
    remainder = parentHeight % imgHeight; //余り 0以外は最後一番下までスクロール
  };

  const autoScrollEvent = () => {
    const tmScroll = gsap.timeline({
      repeat: -1,
      overWrite: true,
      paused: true,
      autoKill: false,
      transformOrigin: "top",
      ease: "power1.inOut",
    });
    tmScroll.to(autoScrollTargetRef.current, {
      //ios - resizeバグのため戻りのアニメーションなし
      y: 0,
      duration: 1,
    });
    for (let index = 0; index < executionScrollCount - 1; index++) {
      tmScroll.to(autoScrollTargetRef.current, {
        y: (index + 1) * parentHeight * -1, //一回の移動距離mockの高さ
        delay: 0.5,
        duration: 2,
        ease: "power1.inOut",
      });
    }
    tmScroll.to(autoScrollTargetRef.current, {
      y: scrollRange,
      delay: 0.5,
      duration: 2,
      ease: "power1.inOut",
    });
    setTimeLine(tmScroll);
    tmScroll.play();
  };

  const scrollCallback = (entries: IntersectionObserverEntry[]) => {
    if (!timeLine || executionScrollCount === 0) return;
    entries.forEach((el) => {
      if (el.isIntersecting) {
        timeLine.play();
      } else {
        timeLine.pause();
      }
    });
  };

  const observerScroll = () => {
    if (autoScrollTargetRef.current === null) return;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    new IntersectionObserver(scrollCallback, options).observe(
      autoScrollTargetRef.current
    );
  };

  return (
    <div className={styles.mockPic}>
      <div className={clsx(styles["mockPic__outside"], styles[device])}>
        <picture className={styles.mockPic__mock}>
          <source
            srcSet={mocks[`${device}-s`].src}
            type="image/webp"
            media="(max-width: 430px)"
          />
          <Image src={mocks[device]} alt="" />
        </picture>
      </div>
      <div className={styles["mockPic__inside-wrap"]}>
        <div
          className={clsx(styles["mockPic__inside"], styles[device])}
          ref={autoScrollParentRef}
        >
          <div className={styles.mockPic__glass}></div>
          <picture className={styles["mockPic__pic"]} ref={autoScrollTargetRef}>
            <Image
              src={device === "desktop" ? images.url + "?fm=webp&q=60" : images.url + "?fm=webp&q=40&dpr=2&w=280"}
              height={images.height}
              width={images.width}
              alt={title}
              priority={device === "desktop"}
              loading={device === "desktop" ? "eager" : "lazy"}
              onLoadingComplete={onAutoScroll}
            />
          </picture>
        </div>
      </div>
    </div>
  );
};
