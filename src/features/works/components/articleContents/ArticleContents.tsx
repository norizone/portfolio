import { FC } from "react";

import { PrimaryHeadline } from "@/components/elements/headline/PrimaryHeadline";
import { PrimaryLink } from "@/components/elements/link/PrimaryLink";
import type { Works } from "@/types/works";
import styles from "./ArticleContents.module.scss";
import { MockPic } from "../mockPic/MockPic";
import { SetActive } from "../../hooks/SetActive";

type Props = {
  data: Works;
};

export const ArticleContent: FC<Props> = (props) => {
  const { data } = props;
  const content = data.contents[0];
  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    return `${y}年${m}月`;
  };
  const releaseDate = content.creation_date
    ? formatDate(new Date(content.creation_date))
    : "";
  const pics = [content.single_img_pc,content.single_img_sp_1, content.single_img_sp_2]
  const topImageIndex = content.single_img_pc.url ? 0:1;
  const mobilePics = [...pics.slice(topImageIndex+1)];
  return (
    <section className={styles.article}>
      <SetActive pageId={content.id}/>
      <div className={styles.article__headline}>
        <PrimaryHeadline tag={"h1"} text={content.title_en} />
      </div>
      <div className={styles["article__top-pic-wrap"]}>
        <MockPic
          device={ topImageIndex=== 0 ? "desktop" : 'mobile'}
          title={content.title}
          images={pics[topImageIndex]}
        />
      </div>
      <div className={styles["article__descriptions"]}>
        <p className={styles["article__title"]}>{content.title}</p>
        <div className={styles["article__comment"]}>
          <p>
            {content.use_tools.map((el, index) => (
              <span className={styles["inline-block"]} key={index}>
                {el}
                {index + 1 !== content.use_tools.length ? " / " : ""}
              </span>
            ))}
            <br />
          </p>
          {content.comment && 
          <p dangerouslySetInnerHTML={{ __html: content.comment }}></p>
          }
          </div>

            <p className={styles["article__link"]}>
            {content.url && !content.no_referrer ?
            <PrimaryLink tag="a" hrefLink={content.url} targetBlank={true} />
            :<span style={{textTransform:'lowercase'}}>{content.url}</span>
            }
            {content.git_url && 
            <PrimaryLink tag="a" hrefLink={content.git_url} targetBlank={true} text={'git hub'}/>
            }
          </p>

          <dl className={styles["article__data"]}>
            <dt className={styles["upper"]}>Release</dt>
            <dd>{releaseDate}</dd>
            <dt className={styles["upper"]}>Role</dt>
            <dd>{content.role}</dd>
          </dl>
          </div>
        
        <div className={styles["article__spPic-wrap"]}>
          {mobilePics.map(
            (el, index) =>
              el && el.url && (
                <MockPic
                  device={"mobile"}
                  images={el}
                  title={content.title}
                  key={index}
                />
              )
          )}
      </div>
    </section>
  );
};