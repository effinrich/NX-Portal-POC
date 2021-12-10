import { IconType } from 'react-icons'
import { FiHome, FiSettings, FiUser } from 'react-icons/fi'
import { Box, BoxProps, Flex, Image, useColorModeValue } from '@chakra-ui/react'

import logo from '../../../assets/logo.png'

import NavItem from './NavItem'

interface LinkItemProps {
  name: string
  path: string
  icon: IconType
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, path: '/' },
  // { name: 'Trending', icon: FiTrendingUp },
  // { name: 'Map Viewer', icon: FiCompass },
  { name: 'Users', icon: FiUser, path: '/users' },
  { name: 'Settings', icon: FiSettings, path: '/settings' }
]

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SideBarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={['none', useColorModeValue('white', 'gray.900')]}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos={['relative', 'fixed']}
      h="full"
      {...rest}
    >
      <Flex
        h={['10', '20']}
        alignItems="center"
        mx="8"
        justifyContent={{ base: 'flex-end', md: 'space-between' }}
        mb={[0, 6]}
      >
        <Box display={{ base: 'none', md: 'block' }}>
          <Image src={logo} maxW="105" height="auto" ml="8" mt="2" />
        </Box>
      </Flex>

      <Box>
        {LinkItems.map(link => (
          <NavItem
            to={link.path}
            key={link.name}
            icon={link.icon}
            onClick={onClose}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  )
}

export default SideBarContent
