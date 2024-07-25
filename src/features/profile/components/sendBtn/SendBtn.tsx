import { LoadingIcon } from '@/components/elements/icon/loadingIcon/LoadingIcon'
import styles from './SendBtn.module.scss'

export const SendBtn = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <button type="submit" className={styles.btn} disabled={isLoading}>
      {isLoading ? (
        <>
          <span className="upper">sending</span>
          <LoadingIcon />
        </>
      ) : (
        <>
          <span className="upper">send message</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21.061"
            height="20.707"
            viewBox="0 0 21.061 20.707"
          >
            <g transform="translate(-5131.691 -1494.793)">
              <path
                d="M5132.044,1495.146l10,10-10,10"
                fill="none"
                stroke="#fff"
                strokeMiterlimit="10"
                strokeWidth="1"
              />
              <path
                d="M5142.044,1495.146l10,10-10,10"
                fill="none"
                stroke="#fff"
                strokeMiterlimit="10"
                strokeWidth="1"
              />
            </g>
          </svg>
        </>
      )}
    </button>
  )
}
