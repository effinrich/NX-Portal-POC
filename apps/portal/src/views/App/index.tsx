/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  CloseButton,
  Container
} from '@chakra-ui/react'
import styled from 'styled-components'

import { AuthButton, Nav, RouteHandler } from '../../components'
import Routes from '../../views'

import { SideBar } from './partials/SideBar'

const StyledApp = styled.div``

// interface IApi extends Users, ApiResponse {}

type DecodedToken = {
  user: Record<string, unknown>
}

type Body = {
  decodedToken: DecodedToken
}

type Profile = {
  body: Body
}

export function App() {
  const { isLoading, error, isAuthenticated } = useAuth0()
  const [apiMessage, setApiMessage] = useState('')

  const [profile] = useLocalStorage<Profile>(
    '@@auth0spajs@@::O4WHfTk59tlLSzX3seoBR4uFosfIZUwu::https://dev--rjghji3.us.auth0.com/api/v2/::openid profile email offline_access'
  )

  // useEffect(() => {
  //   const fetchApi = async () => {
  //     const response = await fetch('/api')
  //     const message = await response.json()
  //     setApiMessage(message.message)
  //   }

  //   fetchApi()
  // }, [setApiMessage])

  if (isLoading) {
    return <div>loading</div>
  }

  return (
    <StyledApp>
      {isAuthenticated ? (
        <SideBar profile={profile && profile.body.decodedToken.user}>
          <Box p="4">
            {/* <Heading pb={3}>Message from API</Heading>
            <Text fontSize={18}>{apiMessage}</Text> */}
            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Auth Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" />
              </Alert>
            )}
          </Box>
          <RouteHandler routes={Routes} />
        </SideBar>
      ) : (
        <Container mt={200}>
          <Center>
            <AuthButton />
          </Center>
        </Container>
      )}
    </StyledApp>
  )
}

export default App
