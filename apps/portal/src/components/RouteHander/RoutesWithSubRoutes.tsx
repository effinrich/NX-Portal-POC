import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Spinner } from '@chakra-ui/react'
import { Loader } from '@phc-portal/shared-ui'

export const accessTypes = { user: 'USER', public: 'PUBLIC' }

const RoutesWithSubRoutes = route => {
  const ComponentWithAuth =
    route.access === accessTypes.user
      ? withAuthenticationRequired(route.Component, {
          onRedirecting: () => (
            <Spinner emptyColor="gray.200" color="blue.500" size="xl" />
          )
        })
      : route.Component

  return route.routes ? (
    <Route path={route.path} exact={route.exact}>
      <ComponentWithAuth routes={route.routes} />
    </Route>
  ) : (
    <Route
      path={route.path}
      exact={route.exact}
      component={ComponentWithAuth}
    ></Route>
  )
}

export default RoutesWithSubRoutes
