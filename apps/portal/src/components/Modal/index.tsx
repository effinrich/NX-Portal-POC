import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import NiceModal, { useModal } from '@ebay/nice-modal-react'

export const Modal = NiceModal.create(({ title, children, onIsOpen }) => {
  const modal = useModal()
  const { isOpen /*, onOpen, onClose*/ } = useDisclosure()
  return (
    <ChakraModal isOpen={isOpen} onClose={() => modal.hide()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
})

export default Modal
