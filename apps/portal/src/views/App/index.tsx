/* eslint-disable @typescript-eslint/no-explicit-any */
import { Redirect, Route, Switch } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  CloseButton,
  Container
} from '@chakra-ui/react'
import { Nav, ProtectedRoute, PublicRoute } from '@phc/portal/components'
import styled from 'styled-components'

import RouteHandler from '../../helpers/Router/RouteHander'
// import { Dashboard, Users } from '@phc/portal/features'
import Routes from '../../views'

const StyledApp = styled.div``

export function App() {
  const { isLoading, error } = useAuth0()

  if (isLoading) {
    return <div>loading</div>
  }

  return (
    <StyledApp>
      <Nav />
      <Container>
        <Center pt={12}>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Auth Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
              <CloseButton position="absolute" right="8px" top="8px" />
            </Alert>
          )}
        </Center>
      </Container>
      <RouteHandler routes={Routes} />
      {/* <Switch>
        <PublicRoute exact path="/login" component={Login} />
        <ProtectedRoute path="/dashboard" component={Dashboard} exact />
        <ProtectedRoute path="/users" component={Users} />
      </Switch> */}
    </StyledApp>
  )
}

export default App
