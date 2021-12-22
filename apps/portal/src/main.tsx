import * as ReactDOM from 'react-dom'
import loadable from '@loadable/component'
import { ErrorBoundary, theme } from '@phc/shared-ui'
import { configPHC, Providers } from '@phc/shared-utils'

const App = loadable(() => import('./views/App'))

ReactDOM.render(
  <Providers
    theme={theme}
    domain={configPHC.auth0Domain}
    clientId={configPHC.auth0ClientId}
    audience={configPHC.auth0Audience}
  >
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Providers>,

  document.getElementById('root')
)
