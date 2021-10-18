import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AppState, Auth0Provider } from '@auth0/auth0-react'
import { ChakraProvider, Skeleton } from '@chakra-ui/react'
import loadable from '@loadable/component'
// import { Loader } from '@phc/shared-ui'
import { createBrowserHistory } from 'history'

const App = loadable(() => import('./views/App'))

export const history = createBrowserHistory()

const onRedirectCallback = (appState: AppState) => {
  // Use the router's history module to replace the url
  history.replace((appState && appState.returnTo) || window.location.pathname)
}

ReactDOM.render(
  <StrictMode>
    <Auth0Provider
      domain={`${process.env.NX_AUTH0_DOMAIN}`}
      clientId={`${process.env.NX_AUTH0_CLIENT_ID}`}
      redirectUri={window.location.origin}
      audience={process.env.NX_AUTH0_AUDIENCE}
      onRedirectCallback={onRedirectCallback}
    >
      <Router>
        <ChakraProvider>
          {/* <Loader> */}
          <App />
          {/* </Loader> */}
        </ChakraProvider>
      </Router>
    </Auth0Provider>
  </StrictMode>,
  document.getElementById('root')
)
