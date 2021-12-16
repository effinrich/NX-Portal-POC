/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, Suspense, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { Switch } from 'react-router-dom'
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
  useColorModeValue as mode,
  VStack
} from '@chakra-ui/react'
import { axios } from '@phc/shared-utils'
import styled from 'styled-components'

import logo from '../../assets/logo.png'
import { Card, Loader, LoginButton, ProtectedRoute } from '../../components'
import { environment } from '../../environments/environment'

import { SideBar } from './partials/SideBar'
// const Dashboard = lazy(() => import('../Dashboard'))
const Home = lazy(() => import('../Home'))
// const Login = lazy(() => import('../Login'))
const MapViewer = lazy(() => import('../MapViewer'))
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

// type UserProfile = {
//   body: Body
// }

// interface Post {
//   id: number
//   name: string
// }

export interface IMapData {
  result: Record<string, unknown>
  coords: {
    lat: number
    lng: number
  }
}
export interface ICoords {
  lat: number
  lng: number
}

type Response = {
  modelBuf: Record<string, unknown>
  paginationResponse: Record<string, unknown>
  data: string[]
}

const AUTH0_AUDIENCE = process.env.NX_AUTH0_AUDIENCE
  ? process.env.NX_AUTH0_AUDIENCE
  : environment.AUTH0_AUDIENCE

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
  const { isLoading, error, isAuthenticated, user, getAccessTokenSilently } =
    useAuth0()

  const [coords, setCoords] = useState<ICoords>()
  const [mapData, setMapData] = useState({})

  const { mutate } = useMutation<Response, unknown, any>(newMapQuery => {
    return axios.post('/model_bufs', newMapQuery.payload, {
      headers: {
        Authorization: `Bearer ${newMapQuery.jwt}`
      }
    })
  })

  useEffect(() => {
    if (isAuthenticated) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const createMapsResults = async () => {
        const authToken = await getAccessTokenSilently({
          audience: `${AUTH0_AUDIENCE}`,
          scope: 'read:users,root:read'
        })

        mutate(
          { payload, jwt: authToken },
          {
            onSuccess: result => {
              setMapData(result.data)
            }
          }
        )
      }

      // return data
      createMapsResults()
    }
  }, [getAccessTokenSilently, isAuthenticated, mutate])

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
              {/* <Route exact path="/login" component={Login} /> */}
              {/* <ProtectedRoute exact path="/">
                <Redirect to="/" />
              </ProtectedRoute> */}
              <ProtectedRoute path="/" component={Home} exact />
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute path="/map-viewer" component={MapViewer} />
              <ProtectedRoute path="/users" component={Users} />
              <ProtectedRoute path="/settings" component={Settings} />
              {/* <Route render={() => <Redirect to="/login" />} /> */}
            </Switch>
          </Suspense>
        </SideBar>
      ) : (
        <Box
          w="100%"
          minH="100vh"
          bg={mode('brand.500', 'gray.900')}
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
