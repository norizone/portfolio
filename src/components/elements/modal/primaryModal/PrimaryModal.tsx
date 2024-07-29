import { ReactNode } from "react"
import style from "./PrimaryModal.module.scss"

type Props = {
  children: ReactNode
  isOpen: boolean
  handleToggle: () => void
}

export const PrimaryModal = (props: Props) => {
  const { children, isOpen, handleToggle } = props
  return (
    <dialog data-dialog="first" open={isOpen} className={style.modal}>
      <div className={style.bg} onClick={handleToggle}>
        <div onClick={(e) => e.stopPropagation()} className={style.contents}>
          {children}
        </div>
      </div>
    </dialog>
  )
}