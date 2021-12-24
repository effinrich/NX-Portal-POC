import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactLocationDevtools } from 'react-location-devtools'
import { BrowserRouter } from 'react-router-dom'
import { AppState, Auth0Provider } from '@auth0/auth0-react'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import NiceModal from '@ebay/nice-modal-react'
import {
  HyperThemeEditor,
  ThemeEditorProvider
} from '@hypertheme-editor/chakra-ui'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

function onRedirectCallback(appState: AppState) {
  // Use the router's history module to replace the url
  history.replace(appState && appState?.returnTo)
}

const queryClient = new QueryClient()

export const Providers = ({ children, domain, clientId, audience, theme }) => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          redirectUri={typeof window !== 'undefined' && window.location.origin}
          audience={audience}
          scope="read:users,root:read"
          useRefreshTokens={true}
          cacheLocation="localstorage"
          onRedirectCallback={onRedirectCallback}
        >
          <ChakraProvider theme={theme}>
            <ThemeEditorProvider>
              <HyperThemeEditor pos="fixed" bottom={4} right={2} />
            </ThemeEditorProvider>
            <NiceModal.Provider>
              <BrowserRouter>
                <ColorModeScript
                  initialColorMode={theme.config.initialColorMode}
                />
                {children}
              </BrowserRouter>
            </NiceModal.Provider>
          </ChakraProvider>
        </Auth0Provider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
