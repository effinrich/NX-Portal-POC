/* NOTE: this view is currently on hold until we
see what Auth0 offers on a paid plan */
import { Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Card, LoginButton } from '@phc/shared-ui'
import styled from 'styled-components'

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
