import { ReactNode } from 'react'
import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'

import MobileNav from './MobileNav'
import SideBarContent from './SideBarContent'

export const SideBar = ({
  children,
  profile,
  isAuthenticated
}: {
  children: ReactNode
  profile: Record<string, unknown>
  isAuthenticated: boolean
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
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
        size="full"
      >
        <DrawerContent>
          <SideBarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} profile={profile} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}
