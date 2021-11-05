import { Box, Container } from '@chakra-ui/react'
import styled from 'styled-components'

/* eslint-disable-next-line */
export interface LoginProps {}

const StyledLogin = styled.div`
  color: black;
`

export const Login = (props: LoginProps) => {
  return (
    <StyledLogin>
      <Container>
        <Box lineHeight="tall">Blah, blah</Box>
      </Container>
    </StyledLogin>
  )
}

export default {
  path: '/login',
  exact: true,
  Component: Login,
  access: 'PUBLIC'
}
