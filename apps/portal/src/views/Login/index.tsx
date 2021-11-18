import { Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Flex } from '@chakra-ui/react'
import styled from 'styled-components'

import { Card, LoginButton } from '../../components'

/* eslint-disable-next-line */
export interface LoginProps {}

const StyledLogin = styled.div`
  color: black;
`

const Login = (props: LoginProps) => {
  const { isAuthenticated } = useAuth0()

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <StyledLogin>
      <Card
        maxW={400}
        minH={200}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <LoginButton />
      </Card>
    </StyledLogin>
  )
}

export default Login
