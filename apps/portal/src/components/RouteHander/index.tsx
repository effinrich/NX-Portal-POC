import { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Loader from '../Loader'

import RoutesWithSubRoutes from './RoutesWithSubRoutes'

export const RouteHandler = ({ routes }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, id) => (
          <RoutesWithSubRoutes {...route} key={id} />
        ))}
        <Route render={() => <Redirect to={{ pathname: '/' }} />} />
      </Switch>
    </Suspense>
  )
}
