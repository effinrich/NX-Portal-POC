import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AppState, Auth0Provider } from '@auth0/auth0-react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  ChakraProvider,
  CloseButton,
  extendTheme
} from '@chakra-ui/react'
import loadable from '@loadable/component'
// import { Loader } from '@phc/shared-ui'
import { createBrowserHistory } from 'history'

import { Button } from './theme'

const App = loadable(() => import('./views/App'))

export const history = createBrowserHistory()

const onRedirectCallback = (appState: AppState) => {
  // Use the router's history module to replace the url
  history.replace((appState && appState.returnTo) || window.location.pathname)
}

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Auth Error</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  )
}

// const theme = extendTheme({
//   components: {
//     Button
//   }
// })

ReactDOM.render(
  <StrictMode>
    {/* <ErrorBoundary
      FallbackComponent={ErrorFallback}
      // onReset={() => setExplode(false)}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    > */}
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
    {/* </ErrorBoundary> */}
  </StrictMode>,
  document.getElementById('root')
)
