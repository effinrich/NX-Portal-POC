// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  // Auth0 vars
  AUTH0_DOMAIN: 'thepublichealthco.us.auth0.com',
  AUTH0_CLIENT_ID: 'zeI3UCoj1ezL2nXAGFl5VmuK3515nYDj',
  AUTH0_AUDIENCE: 'rest.pluto.thepublichealthco.com',

  //Nx vars
  NX_CLOUD_AUTH_TOKEN:
    'MGNhZTA0NWUtOGYxNy00NGJkLTkyMWYtZmEzNGVhYTI5ZjUyfHJlYWQtd3JpdGU=',
  NX_DAEMON: true,

  //Google Maps API vars
  MAPS_API_KEY: 'AIzaSyDpY1vGYmMGVLlAlH-gtRzRq64y_8l02ZQ',
  MAPS_LIBS: ['geometry', 'drawing', 'places']
}
