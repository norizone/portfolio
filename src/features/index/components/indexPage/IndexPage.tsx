"use client";
import {type FC, useEffect ,useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { MainContents } from "@/features/index/components/mainContents/MainContents";
import { ViewMore } from "../viewMore/ViewMore";
import { Indicators } from "../indicators/Indicators";
import styles from "./IndexPage.module.scss";
import type { ListWorksContents } from "@/types/works";
import { activeWorkState, composeWorksList  } from "@/stores/worksStates";

type Props = {
  contents: Array<ListWorksContents>;
  totalCount: number
};

export const IndexPage: FC<Props> = (props) => {
  const { contents ,totalCount} = props;
  const [works, setWorks] = useRecoilState(composeWorksList);
  const activeIndex = useRecoilValue(activeWorkState);
  const activeWork = useRef<number>(activeIndex)

  useEffect(()=>{
    if(contents <= works) return;
    setWorks([...works,...contents]);
  },[])

  return (
    <div>
      <div className={styles.index_contents__wrap} id="js-canvasTargetWrap">
        {works.map((el, index) => (
          <MainContents 
          contents={el} key={index}
          contentsIndex={index}
          isScrollTarget={ activeWork.current===index ? true : false }
          />
        ))}
        {works.length >1 && 
        <ViewMore totalCount={totalCount}/>
        }
      </div>
      {works.length >1 && 
      <Indicators works={works} />
      }
    </div>
  );
};
