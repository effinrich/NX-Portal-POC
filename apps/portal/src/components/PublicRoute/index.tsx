import { Redirect, Route } from 'react-router-dom'

export interface PublicRouteProps {
  children: Record<string, unknown>
  isAuthenticated: boolean
}

export const PublicRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
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
