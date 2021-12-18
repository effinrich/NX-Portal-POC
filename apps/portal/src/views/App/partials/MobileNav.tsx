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
  // Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  // useColorModeValue,
  VStack
} from '@chakra-ui/react'

import { Autocomplete, Loader } from '../../../components'

interface MobileProps extends FlexProps {
  onOpen: () => void
  user: Record<string, unknown>
}

const options = [
  { value: 'ghana', label: 'Ghana' },
  { value: 'nigeria', label: 'Nigeria' },
  { value: 'kenya', label: 'Kenya' },
  { value: 'southAfrica', label: 'South Africa' },
  { value: 'unitedStates', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  { value: 'germany', label: 'Germany' }
]

const MobileNav = ({ onOpen, user, ...rest }: MobileProps) => {
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
      <Box w="50px" display={{ md: 'none' }} mr={4}>
        <IconButton
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
      </Box>
      <Box w="100%">
        <Autocomplete options={options} />
      </Box>

      {/* <Box w="100px" display={{ base: 'flex', md: 'none' }}>
        <Image src={logo} />
      </Box> */}

      <Box w={['80px', 'inherit']}>
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
                <HStack w={['inherit', '150px']}>
                  {user ? (
                    <>
                      <Avatar size={'sm'} src={`${user.picture}`} />
                      <VStack
                        display={{ base: 'none', md: 'flex' }}
                        alignItems="flex-start"
                        spacing="1px"
                        ml="2"
                      >
                        {/* // eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                        <Text fontSize="sm">{user.name}</Text>
                        <Text fontSize="xs" color="gray.600">
                          Admin
                        </Text>
                      </VStack>
                    </>
                  ) : (
                    <Loader size="sm" />
                  )}

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
      </Box>
    </Flex>
  )
}

export default MobileNav
