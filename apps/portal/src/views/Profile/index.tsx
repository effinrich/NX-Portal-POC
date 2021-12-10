import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import {
  Button,
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

import { Loader, ProfileForm, UserProfile } from '../../components'

/* eslint-disable-next-line */
export interface ProfileProps {}

const StyledProfile = styled.div`
  color: black;
`

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

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loader size="xl" />
})
