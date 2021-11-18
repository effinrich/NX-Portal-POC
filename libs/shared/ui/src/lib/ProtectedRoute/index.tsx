import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'

export interface ProtectedRouteProps {
  component: never
}

export const ProtectedRoute = ({
  component,
  ...args
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
React.PropsWithChildren<any>) => (
  <Route
    render={props => {
      const Component = withAuthenticationRequired(component, {
        // If using a Hash Router, you need to pass the hash fragment as `returnTo`
        // returnTo: () => window.location.hash.substr(1),
      })
      return <Component {...props} />
    }}
    {...args}
  />
)

export default ProtectedRoute
