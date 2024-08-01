'use client'

import { ReactNode, forwardRef } from 'react'
import ReactModal from 'react-modal'
import FocusLock from 'react-focus-lock'

export type PrimaryModalProps = {
  children: ReactNode
  handleToggleModal: () => void
  isOpen: boolean
  isOnlyBtn?: boolean
}

const customStyles = {
  overlay: {
    Position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#0c0c0cbe',
    zIndex: 200,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '840px',
    zIndex: 201,
    minWidth: '320px',
    width: 'max-content',
    minHeight: 'max-content',
    overflow: 'hidden',
    background: '#000000',
    border: 'none'
  },
}

ReactModal.setAppElement('body')

const PrimaryModal = forwardRef<HTMLElement, PrimaryModalProps>(
  (props: PrimaryModalProps, ref) => {
    const { children, handleToggleModal, isOpen, isOnlyBtn = false } = props

    return (
      <FocusLock ref={ref}>
        <ReactModal
          style={customStyles}
          isOpen={isOpen}
          onRequestClose={() => {
            !isOnlyBtn && handleToggleModal()
          }}
          contentLabel="Modal"
          ariaHideApp={false}
        >
          {children}
        </ReactModal>
      </FocusLock>
    )
  },
)

PrimaryModal.displayName = 'PrimaryModal'

export default PrimaryModal
