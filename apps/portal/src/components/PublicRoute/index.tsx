import { Redirect, Route } from 'react-router-dom'

export interface PublicRouteProps {
  component: Record<string, unknown>
  isAuthenticated: boolean
}

export const PublicRoute = ({ component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          component
        ) : (
          <Redirect
            to={{
              pathname: '/home',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default PublicRoute
