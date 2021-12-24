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
import { User } from '@phc/shared-data-assets'
import { ProfileForm, UserProfile } from '@phc/shared-ui'
import styled from 'styled-components'
/* eslint-disable-next-line */
export interface ProfileProps {
  user: User
}

const StyledProfile = styled.div``

const Profile = (props: ProfileProps) => {
  const { user } = useAuth0()
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <StyledProfile data-testid="profile">
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
