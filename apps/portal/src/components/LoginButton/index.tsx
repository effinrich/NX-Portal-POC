import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button
      bg="black"
      color="white"
      variant="solid"
      _hover={{ color: 'black', backgroundColor: 'gray.300' }}
      onClick={() => loginWithRedirect({ screen_hint: 'login' })}
    >
      Login into your PHC Account
    </Button>
  )
}

export default LoginButton
