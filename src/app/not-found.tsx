import { PrimaryHeadline } from "@/components/elements/headline/PrimaryHeadline";
import { PrimaryLink } from "@/components/elements/link/PrimaryLink";

export default function NotFound() {
  return (
    <div className="error-page">
      <PrimaryHeadline tag={'p'} text={'404'}/>
      <p className="error__text">ページが見つかりませんでした。</p>
      <div className="error-page__link">
      <PrimaryLink tag={'Link'} hrefLink={"/"} text="Return to home"/>
      </div>
    </div>
  );
}