import { environment } from './environments/environment'

const AUTH0_DOMAIN = process.env.NX_AUTH0_DOMAIN
  ? process.env.NX_AUTH0_DOMAIN
  : environment.AUTH0_DOMAIN
const AUTH0_CLIENT_ID = process.env.NX_AUTH0_CLIENT_ID
  ? process.env.NX_AUTH0_CLIENT_ID
  : environment.AUTH0_CLIENT_ID
const AUTH0_AUDIENCE = process.env.NX_AUTH0_AUDIENCE
  ? process.env.NX_AUTH0_AUDIENCE
  : environment.AUTH0_AUDIENCE

const MAPBOX_TOKEN = process.env.NX_MAPBOX_TOKEN
  ? process.env.NX_MAPBOX_TOKEN
  : environment.MAPBOX_TOKEN

const GOOGLE_MAPS_API_KEY = process.env.NX_MAPS_API_KEY
  ? process.env.NX_MAPS_API_KEY
  : environment.MAPS_API_KEY

export const configPHC = {
  auth0Domain: AUTH0_DOMAIN,
  auth0ClientId: AUTH0_CLIENT_ID,
  auth0Audience: AUTH0_AUDIENCE,
  //mapbox
  mapboxToken: MAPBOX_TOKEN,
  //google maps
  googleMapsApiKey: GOOGLE_MAPS_API_KEY
}

export default configPHC
