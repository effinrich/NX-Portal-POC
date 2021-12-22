/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, Suspense, useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { useMutation } from 'react-query'
import { Switch } from 'react-router-dom'
import useUnmountPromise from 'react-use/lib/useUnmountPromise'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  CloseButton,
  Image,
  useColorModeValue,
  VStack
} from '@chakra-ui/react'
import { Card, Loader, LoginButton, ProtectedRoute } from '@phc/shared-ui'
import { useAxiosApi } from '@phc/shared-utils'
import styled from 'styled-components'

import logo from '../../assets/logo.png'

import { SideBar } from './partials/SideBar'

const Home = lazy(() => import('../Home'))
const Profile = lazy(() => import('../Profile'))
const Users = lazy(() => import('../Users'))
const Settings = lazy(() => import('../Settings'))
const Location = lazy(() => import('../Location'))

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
        <SideBar
          user={user} // eslint-disable-line @typescript-eslint/no-non-null-assertion
          isAuthenticated
        >
          <Box p="4">
            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Auth Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" />
              </Alert>
            )}
          </Box>
          <Suspense fallback={<Loader size="xl" />}>
            <Switch>
              <ProtectedRoute path="/" component={Home} exact />
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute path="/users" component={Users} />
              <ProtectedRoute path="/settings" component={Settings} />
              <ProtectedRoute path="/location/:id" component={Location} />
            </Switch>
          </Suspense>
        </SideBar>
      ) : (
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
