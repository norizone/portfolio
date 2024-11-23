import { PrimaryHeadline } from "@/components/elements/headline/primaryHeadline/PrimaryHeadline";
import styles from './_components/articleContents/ArticleContents.module.scss'

const loading = () => {
  return (
    <div className={styles.article__headline}>
      <PrimaryHeadline tag={'h1'} text="loading..." />
    </div>
  );

};

export default loading;