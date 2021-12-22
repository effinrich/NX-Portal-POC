import * as React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import Loader from '../Loader'

export const accessTypes = { user: 'USER', public: 'PUBLIC' }

export const RouteWithAuth = route => {
  return route.access === accessTypes.user
    ? withAuthenticationRequired(route.Component, {
        onRedirecting: () => <Loader size="xl" />
      })
    : route.Component
}

export default RouteWithAuth
