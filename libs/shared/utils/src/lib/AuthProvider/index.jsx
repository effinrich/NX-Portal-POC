/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import { getConfig } from './getConfig'

const config = getConfig()

const AuthProvider = ({ children }) => {
  const history = useHistory()

  const onRedirectCallback = appState => {
    history.push(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={config.audience}
    >
      {children}
    </Auth0Provider>
  )
}

export default AuthProvider
