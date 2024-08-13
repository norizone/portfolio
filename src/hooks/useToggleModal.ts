import { useState } from 'react'
import { useFixBody } from './useFixeBody'

export const useToggleModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const { fixBody, unfixedBody } = useFixBody()

  const toggleModal = () => {
    isOpenModal ? unfixedBody() : fixBody()
    setIsOpenModal(!isOpenModal)
  }

  const onOpenModal = () => {
    fixBody()
    setIsOpenModal(true)
  }

  const onCloseModal = () => {
    unfixedBody()
    setIsOpenModal(false)
  }

  return {
    isOpenModal,
    toggleModal,
    onOpenModal,
    onCloseModal,
  }
}
