import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'

export interface LoginButtonProps {
  /**
   * Chakra UI style variants
   */
  variant?: 'solid' | 'ghost' | 'outline' | 'link'
  /**
   * Calls loginWithRedirect for Auth0
   */
  onClick?: () => void
}

export const LoginButton = (props: LoginButtonProps) => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button
      data-testid="login-button"
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
