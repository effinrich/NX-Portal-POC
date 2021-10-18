import { Redirect, Route, Switch } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'

export const accessTypes = { user: 'USER', public: 'PUBLIC' }

const RoutesWithSubRoutes = route => {
  console.log('route = ', route.access)
  const ComponentWithAuth =
    route.access === accessTypes.user
      ? withAuthenticationRequired(route.Component, {})
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
