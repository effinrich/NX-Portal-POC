import { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'

import RoutesWithSubRoutes from './RoutesWithSubRoutes'

export const RouteHandler = ({ routes }) => {
  return (
    <Suspense
      fallback={<Spinner emptyColor="gray.200" color="blue.500" size="xl" />}
    >
      <Switch>
        {routes.map((route, id) => (
          <RoutesWithSubRoutes {...route} key={id} />
        ))}
        <Route render={() => <Redirect to={{ pathname: '/' }} />} />
      </Switch>
    </Suspense>
  )
}
