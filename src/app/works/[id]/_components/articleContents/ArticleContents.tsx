import { PrimaryLink } from '@/components/elements/link/primaryLink/PrimaryLink'
import styles from './ArticleContents.module.scss'
import { MockPic } from '@/features/works/components/mockPic/MockPic'
import { PrimaryHeadline } from '@/components/elements/headline/primaryHeadline/PrimaryHeadline'
import { DetailWork } from '@/types/api/front'

type Props = {
  item: DetailWork
}

export const ArticleContent = (props: Props) => {
  const { item } = props
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
          {item.comment && (
            <p className='pre'>
              {item.comment}</p>
          )}
        </div>

        <p className={styles['article__link']}>
          {(item.url && Number(item.isLinkToUrl) === 1) &&
            <PrimaryLink hrefLink={item.url} targetBlank={true} />
          }
          {item.gitUrl &&
            <PrimaryLink
              hrefLink={item.gitUrl}
              targetBlank={true}
              text={'git hub'}
            />
          }
        </p>

        <dl className={styles['article__data']}>
          <dt className={styles['upper']}>Role</dt>
          <dd>{item.role}</dd>
          <dt className={styles['upper']}>Tech</dt>
          <dd>
            {item.useTools.map((el, index) => (
              <span
                className='inline-block'
                key={index}
              >
                {el.toolName}
                {index + 1 !== item.useTools.length ? `/` : ''}
              </span>
            ))}
          </dd>
          {item.url && Number(item.isLinkToUrl) === 0 && (
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
