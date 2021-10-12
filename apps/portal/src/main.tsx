import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './app/app'

const onRedirectCallback = (appState: { returnTo: string }) => {
  const history = useHistory()

  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  )
}

ReactDOM.render(
  <StrictMode>
    <Router>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
)
