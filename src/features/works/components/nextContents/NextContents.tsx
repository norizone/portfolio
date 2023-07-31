"use client";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import useSWR from 'swr'
import axios from "axios";

import styles from "./NextContents.module.scss";
import { PrimaryHeadline } from "@/components/elements/headline/PrimaryHeadline";
import type { WorksContent} from "@/types/works";

type Props = { publishedAt: string };
type Contents = Pick<WorksContent,'title_en'|'id'>

const getNextPage = async (url: string) => {
  return axios
    .get(`${url}`, {
      headers: {
        Accept: "application/json",
        "X-Requested-With": "fetch",
      },
    })
    .then((res) => res);
};

export const NextContents: FC<Props> = (props) => {
  const { publishedAt } = props;
  const { data } = useSWR(publishedAt ? `/api/nextPage?publishedAt=${publishedAt}` : null, getNextPage)
  const contents:Contents = data && data.data
  return (
    <>
    {data!==undefined &&
    <div className={styles.pageNext}>
      <p className={clsx("upper", styles.pageNext__titles)}>
        <span className={styles.pageNext__title} >NEXT WORK</span>
        <span className={styles.pageNext__line}></span>
      </p>
      <Link className={styles.pageNext__link} href={`/works/${contents.id}`}>
        <PrimaryHeadline tag={"p"} text={contents.title_en} />
      </Link>
    </div>
  }
  </>
  );
};
