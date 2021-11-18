import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button
      colorScheme="black"
      variant="outline"
      onClick={() => loginWithRedirect({ screen_hint: 'login' })}
    >
      Login into your PHC Account
    </Button>
  )
}

export default LoginButton
