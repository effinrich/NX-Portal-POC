import { ReactNode } from 'react'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Image,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { User } from '@phc/shared-data-assets'

import logo from '../../../assets/logo.png'

import MobileNav from './MobileNav'
import SideBarContent from './SideBarContent'

export const SideBar = ({
  children,
  user
}: {
  children: ReactNode
  user: User
  isAuthenticated: boolean
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <SideBarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        isFullHeight
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody p={0}>
            <SideBarContent onClose={onClose} />
          </DrawerBody>
          <DrawerCloseButton />
          <DrawerFooter borderTopWidth="1px">
            <Box display={{ base: 'none', md: 'block' }}>
              <Image src={logo} maxW="105" height="auto" ml="8" mt="2" />
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} user={user} />
      <Box ml={{ base: 0, md: 60 }} p="4" bg="gray.50">
        {children}
      </Box>
    </Box>
  )
}
