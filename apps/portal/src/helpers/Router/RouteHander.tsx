import { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import RoutesWithSubRoutes from './RoutesWithSubRoutes'

const RouteHandler = ({ routes }) => {
  console.log('routes = ', routes)
  return (
    <Suspense fallback={'loading'}>
      <Switch>
        {routes.map((route, id) => (
          <RoutesWithSubRoutes {...route} key={id} />
        ))}
        <Route render={() => <Redirect to={{ pathname: '/' }} />} />
      </Switch>
    </Suspense>
  )
}

export default RouteHandler
