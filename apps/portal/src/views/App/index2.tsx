/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, Suspense, useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import {
  BsFillBookmarksFill,
  BsFillInboxFill,
  BsPencilSquare,
  BsSearch
} from 'react-icons/bs'
import { useMutation } from 'react-query'
import { Switch } from 'react-router-dom'
import useUnmountPromise from 'react-use/lib/useUnmountPromise'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Center,
  CloseButton,
  Flex,
  Heading,
  Image,
  Stack,
  useColorModeValue as mode,
  useColorModeValue,
  VStack
} from '@chakra-ui/react'
import { Card, Loader, LoginButton, ProtectedRoute } from '@phc/shared-ui'
import { useAxiosApi } from '@phc/shared-utils'
import styled from 'styled-components'

import logo from '../../assets/logo.png'

import { SideBar } from './partials/SideBar'
import { data } from './partials2/_data'
import { MobileMenuButton } from './partials2/MobileMenuButton'
import { NavBreadcrumb } from './partials2/NavBreadcrumb'
import { NavSectionTitle } from './partials2/NavSectionTitle'
import { ScrollArea } from './partials2/ScrollArea'
import { SearchInput } from './partials2/SearchInput'
import { SidebarLink } from './partials2/SidebarLink'
import { useMobileMenuState } from './partials2/useMobileMenuState'
import { UserInfo } from './partials2/UserInfo'

const Home = lazy(() => import('../Home'))
const Profile = lazy(() => import('../Profile'))
const Users = lazy(() => import('../Users'))
const Settings = lazy(() => import('../Settings'))

const StyledApp = styled.div``

// interface IApi extends Users, ApiResponse {}
type DecodedToken = {
  user: Record<string, unknown>
}

type Body = {
  decodedToken: DecodedToken
}

type Response = {
  modelBuf: Record<string, unknown>
  paginationResponse: Record<string, unknown>
  data: string[]
}

const payload = {
  search_criteria: {
    search_condition: [
      {
        field_condition: [
          {
            field: 'location.region',
            operation: 'EQUALS',
            value: {
              string_value: 'Brevard_Florida'
            }
          }
        ]
      }
    ],
    sorting_criteria: [
      {
        field_sort: {
          order: 'DESC',
          field_name: 'forecast_date'
        }
      }
    ],
    pagination: {
      size: 10,
      from: 90
    }
  }
}

export function App() {
  const axios = useAxiosApi()
  const { isLoading, error, isAuthenticated, user, getAccessTokenSilently } =
    useAuth0()
  const colorMode = useColorModeValue('brand.500', 'gray.900')
  const handleError = useErrorHandler()
  const mounted = useUnmountPromise()
  const [mapData, setMapData] = useState({})
  const { isOpen, toggle } = useMobileMenuState()

  const { mutate } = useMutation<Response, unknown, any>(newMapQuery => {
    return axios.post('/model_bufs', newMapQuery.payload, {})
  })

  useEffect(() => {
    if (isAuthenticated) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const createMapsResults = async () => {
        mutate(
          { payload },
          {
            onError: error => handleError(error),
            onSuccess: result => {
              setMapData(result.data)
            },
            onSettled: (data, error, variables, context) => {
              // Error or success... doesn't matter!
            }
          }
        )
      }

      // return data
      mounted(createMapsResults(), handleError)
    }
  }, [getAccessTokenSilently, isAuthenticated, mutate, handleError, mounted])

  if (isLoading) {
    return <Loader size="xl" />
  }

  return (
    <StyledApp>
      {isAuthenticated ? (
        <Flex
          height="100vh"
          bg={colorMode}
          overflow="hidden"
          sx={{ '--sidebar-width': '16rem' }}
        >
          <Box
            as="nav"
            display="block"
            flex="1"
            width="var(--sidebar-width)"
            left="0"
            py="5"
            px="3"
            color="gray.200"
            position="fixed"
          >
            <Box fontSize="sm" lineHeight="tall">
              <Box
                as="a"
                href="#"
                p="3"
                display="block"
                transition="background 0.1s"
                rounded="xl"
                _hover={{ bg: 'whiteAlpha.200' }}
                whiteSpace="nowrap"
              >
                <UserInfo
                  name="Esther Collins"
                  email="esther-colls@chakra.com"
                />
              </Box>
              <ScrollArea pt="5" pb="6">
                <SidebarLink
                  display={{ base: 'block', lg: 'none' }}
                  mb="2"
                  icon={<BsSearch />}
                >
                  Search
                </SidebarLink>
                <Stack pb="6">
                  <SidebarLink icon={<BsFillInboxFill />}>Inbox</SidebarLink>
                  <SidebarLink icon={<BsFillBookmarksFill />}>
                    Bookmarks
                  </SidebarLink>
                  <SidebarLink icon={<BsPencilSquare />}>Drafts</SidebarLink>
                </Stack>
                {/* <Stack pb="6">
                  <NavSectionTitle>Chats</NavSectionTitle>
                  <SidebarLink>🎉 Inbox</SidebarLink>
                  <SidebarLink>👍 Personal</SidebarLink>
                  <SidebarLink>🦋 Work</SidebarLink>
                </Stack>
                <Stack>
                  <NavSectionTitle>Members</NavSectionTitle>
                  {data.users.map((user, index) => (
                    <SidebarLink
                      key={index}
                      avatar={
                        <Avatar size="xs" name={user.name} src={user.image} />
                      }
                    >
                      {user.name}
                    </SidebarLink>
                  ))}
                </Stack> */}
              </ScrollArea>
            </Box>
          </Box>
          <Box
            flex="1"
            marginStart={{ md: 'var(--sidebar-width)' }}
            position="relative"
            left={isOpen ? 'var(--sidebar-width)' : '0'}
            transition="left 0.2s"
          >
            <Box
              maxW="2560px"
              bg={mode('white', 'gray.700')}
              height="100%"
              pb="6"
              // rounded={{ md: 'lg' }}
            >
              <Flex direction="column" height="full">
                <Flex
                  w="full"
                  py="4"
                  justify="space-between"
                  align="center"
                  px="10"
                >
                  <Flex align="center" minH="8">
                    <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                    <NavBreadcrumb />
                  </Flex>
                  <SearchInput />
                </Flex>
                <Flex
                  direction="column"
                  flex="1"
                  overflow="auto"
                  px="10"
                  pt="8"
                >
                  <Heading size="md" fontWeight="extrabold" mb="6">
                    Product Vision
                  </Heading>
                  <Box
                    flex="1"
                    borderWidth="3px"
                    borderStyle="dashed"
                    rounded="xl"
                  />
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Flex>
      ) : (
        // <SideBar
        //   user={user} // eslint-disable-line @typescript-eslint/no-non-null-assertion
        //   isAuthenticated
        // >
        //   <Box p="4">
        //     {error && (
        //       <Alert status="error">
        //         <AlertIcon />
        //         <AlertTitle mr={2}>Auth Error</AlertTitle>
        //         <AlertDescription>{error.message}</AlertDescription>
        //         <CloseButton position="absolute" right="8px" top="8px" />
        //       </Alert>
        //     )}
        //   </Box>
        //   <Suspense fallback={<Loader size="xl" />}>
        //     <Switch>
        //       <ProtectedRoute path="/" component={Home} exact />
        //       <ProtectedRoute path="/profile" component={Profile} />
        //       <ProtectedRoute path="/users" component={Users} />
        //       <ProtectedRoute path="/settings" component={Settings} />
        //     </Switch>
        //   </Suspense>
        // </SideBar>
        <Box
          w="100%"
          minH="100vh"
          bg={colorMode}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Card
            w="100%"
            maxW={[300, 400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection={['row']}
          >
            <VStack spacing={4} align="stretch">
              <Box pb={6}>
                <Center>
                  <Image src={logo} maxW="200" />
                </Center>
              </Box>
              <Box>
                <LoginButton />
              </Box>
            </VStack>
          </Card>
        </Box>
      )}
    </StyledApp>
  )
}

export default App
