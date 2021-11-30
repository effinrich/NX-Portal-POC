import * as ReactDOM from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
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
import { createBrowserHistory } from 'history'

import { environment } from './environments/environment'
import { store } from './store'
import { theme } from './theme'

const App = loadable(() => import('./views/App'))

export const history = createBrowserHistory()

const onRedirectCallback = (appState: AppState) => {
  // Use the router's history module to replace the url
  history.replace(appState && appState?.returnTo)
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

const queryClient = new QueryClient()

const AUTH0_DOMAIN = process.env.NX_AUTH0_DOMAIN
  ? process.env.NX_AUTH0_DOMAIN
  : environment.AUTH0_DOMAIN
const AUTH0_CLIENT_ID = process.env.NX_AUTH0_CLIENT_ID
  ? process.env.NX_AUTH0_CLIENT_ID
  : environment.AUTH0_CLIENT_ID
const AUTH0_AUDIENCE = process.env.NX_AUTH0_AUDIENCE
  ? process.env.NX_AUTH0_AUDIENCE
  : environment.AUTH0_AUDIENCE

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Auth0Provider
      domain={`${AUTH0_DOMAIN}`}
      clientId={`${AUTH0_CLIENT_ID}`}
      redirectUri={typeof window !== 'undefined' && window.location.origin}
      audience={AUTH0_AUDIENCE}
      scope="read:users"
      useRefreshTokens={true}
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallback}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <Router>
              {/* <Loader> */}

              <App />

              {/* </Loader> */}
            </Router>
          </ChakraProvider>
        </Provider>
      </ErrorBoundary>
    </Auth0Provider>
  </QueryClientProvider>,

  document.getElementById('root')
)
