import { useAuth0 } from '@auth0/auth0-react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import styled from 'styled-components'

import { ProfileForm, UserProfile } from '../../components'

/* eslint-disable-next-line */
export interface ProfileProps {}

const StyledProfile = styled.div``

const Profile = (props: ProfileProps) => {
  const { user } = useAuth0()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <StyledProfile>
      <UserProfile user={user} onModalOpen={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProfileForm onModalClose={onClose} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </StyledProfile>
  )
}

export default Profile
