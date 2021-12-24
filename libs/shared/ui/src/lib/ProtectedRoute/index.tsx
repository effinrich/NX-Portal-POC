import * as React from 'react'
import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import { Loader } from '../Loader'

export interface ProtectedRouteProps {
  component: never
}

export const ProtectedRoute = ({
  component,
  ...args
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
React.PropsWithChildren<any>) => (
  <Route
    render={(
      props: JSX.IntrinsicAttributes & object & { children?: React.ReactNode }
    ) => {
      const Component = withAuthenticationRequired(component, {
        onRedirecting: () => <Loader size="xl" />
      })
      return <Component {...props} />
    }}
    {...args}
  />
)

export default ProtectedRoute
