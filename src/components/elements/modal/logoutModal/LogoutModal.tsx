import clsx from "clsx"
import { PrimaryBtn } from "../../btn/primaryBtn/PrimaryBtn"
import PrimaryModal, { PrimaryModalProps } from "../primaryModal/PrimaryModal"
import style from "./LogoutModal.module.scss"

type Props = Omit<PrimaryModalProps, 'children' | 'handleToggleModal'> & {
  title?: string
  onClose: () => void
}

export const LogoutModal = (props: Props) => {
  const { title = 'ログアウトしました', onClose, ...primaryModalProps } = props
  return (
    <PrimaryModal handleToggleModal={onClose} {...primaryModalProps}>
      <div className={style.wrap}>
        <p className={clsx(style.title, 'pre')}>
          {title}
        </p>
        <PrimaryBtn onClick={onClose}>
          <span className="upper">Close</span>
          <span className={style.close}></span>
        </PrimaryBtn>
      </div>
    </PrimaryModal>
  )
}