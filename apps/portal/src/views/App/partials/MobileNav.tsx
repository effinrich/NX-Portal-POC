import { FiBell, FiChevronDown, FiMenu } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react'

import logo from '../../../assets/logo.png'

interface MobileProps extends FlexProps {
  onOpen: () => void
  profile: Record<string, unknown>
}

const MobileNav = ({ onOpen, profile, ...rest }: MobileProps) => {
  const { logout } = useAuth0()
  const history = useHistory()
  const handleProfileClick = () => history.push('/profile')

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={'white'}
      borderBottomWidth="1px"
      borderBottomColor={'gray.200'}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Box display={{ base: 'flex', md: 'none' }}>
        <Image src={logo} maxW="100" style={{ margin: '0, auto' }} />
      </Box>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar size={'sm'} src={`${profile && profile.picture}`} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{profile && profile.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={'white'} borderColor={'gray.200'}>
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              {/* <MenuItem>Settings</MenuItem> */}
              {/* <MenuItem>Billing</MenuItem> */}
              <MenuDivider />
              <MenuItem
                onClick={() =>
                  logout({
                    returnTo: window.location.origin
                  })
                }
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

export default MobileNav
