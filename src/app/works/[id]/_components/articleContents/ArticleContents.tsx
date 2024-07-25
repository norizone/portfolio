import { PrimaryLink } from '@/components/elements/link/primaryLink/PrimaryLink'
import styles from './ArticleContents.module.scss'
import { MockPic } from '@/features/works/components/mockPic/MockPic'
import { PrimaryHeadline } from '@/components/elements/headline/primaryHeadline/PrimaryHeadline'
import { DetailWork } from '@/types/api/front'
import { useCurrentWork } from '@/hooks/useCurrentWork'

type Props = {
  item: DetailWork
}

export const ArticleContent = (props: Props) => {
  const { item } = props
  const formatDate = (date: Date) => {
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    return `${y}年${m}月`
  }
  // const releaseDate = content.creation_date
  //   ? formatDate(new Date(content.creation_date))
  //   : ''
  const pics = [item.singleImgMain, item.singleImgSub, item.singleImgSub2]

  const topImageIndex = item.singleImgMain ? 0 : 1
  const mobilePics = [...pics.slice(topImageIndex + 1)]

  return (
    <section className={styles.article}>
      <div className={styles.article__headline}>
        <PrimaryHeadline tag={'h1'} text={item.titleEn} />
      </div>
      <div className={styles['article__top-pic-wrap']}>
        <MockPic
          device={'desktop'}
          title={item.title}
          imageUrl={item.singleImgMain}
        />
      </div>
      <div className={styles['article__descriptions']}>
        <p className={styles['article__title']}>{item.title}</p>
        <div className={styles['article__comment']}>
          <p>
            {item.useTools.map((tool, index) => (
              <span className={styles['inline-block']} key={index}>
                {tool.toolName}
                {index + 1 !== item.useTools.length ? ' / ' : ''}
              </span>
            ))}
            <br />
          </p>
          {item.comment && (
            <p dangerouslySetInnerHTML={{ __html: item.comment }}></p>
          )}
        </div>

        <p className={styles['article__link']}>
          {/* {item.url && !content.no_referrer && (
            <PrimaryLink tag="a" hrefLink={content.url} targetBlank={true} />
          )} */}
          {item.gitUrl && (
            <PrimaryLink
              tag="a"
              hrefLink={item.gitUrl}
              targetBlank={true}
              text={'git hub'}
            />
          )}
        </p>

        <dl className={styles['article__data']}>
          {/* <dt className={styles['upper']}>Release</dt>
          <dd>{releaseDate}</dd> */}
          <dt className={styles['upper']}>Role</dt>
          <dd>{item.role}</dd>
          {item.url && (
            <>
              <dt className={styles['upper']}>URL</dt>
              <dd>{item.url}</dd>
            </>
          )}
        </dl>
      </div>

      <div className={styles['article__spPic-wrap']}>
        {[item.singleImgSub, item.singleImgSub2].map(
          (el, index) =>
            el && <MockPic device={'mobile'} imageUrl={el} key={index} />
        )}
      </div>
    </section>
  )
}
