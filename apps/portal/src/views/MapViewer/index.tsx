import { useEffect, useState } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import styled from 'styled-components'

import { GoogleMapComponent, Loader } from '../../components'
import { environment } from '../../environments/environment'

/* eslint-disable-next-line */
export interface MapViewProps {}

const StyledMapViewer = styled.div`
  color: pink;
`
type DecodedToken = {
  user: Record<string, unknown>
}

type Body = {
  decodedToken: DecodedToken
}

type Profile = {
  body: Body
}
interface Post {
  id: number
  name: string
}

export interface IMapData {
  result: Record<string, unknown>
  coords: {
    lat: number
    lng: number
  }
}
export interface ICoords {
  lat: number
  lng: number
}

const formatCoords = (n: number) => {
  const l = n.toString().length - 3
  const v = n / Math.pow(10, l)

  return v
}

const AUTH0_AUDIENCE = process.env.NX_AUTH0_AUDIENCE
  ? process.env.NX_AUTH0_AUDIENCE
  : environment.AUTH0_AUDIENCE

const MapViewer = (props: MapViewProps) => {
  const { isLoading, getAccessTokenSilently } = useAuth0()
  const [coords, setCoords] = useState<ICoords>()
  const [mapData, setMapData] = useState({
    result: {
      modelBuf: {
        centroids: {
          geometry: {
            coords: {}
          }
        }
      }
    }
  })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const url = 'https://rest.pluto.thepublichealthco.com/blocking/model_bufs'

    const fetchMapData = async () => {
      const authToken = await getAccessTokenSilently({
        audience: `${AUTH0_AUDIENCE}`,
        scope: 'read:users,root:read'
      })
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          search_criteria: {
            search_condition: [
              {
                field_condition: [
                  {
                    field: 'location.region',
                    operation: 'EQUALS',
                    value: {
                      string_value: 'Brevard_Florida'
                    }
                  }
                ]
              }
            ],
            sorting_criteria: [
              {
                field_sort: {
                  order: 'DESC',
                  field_name: 'forecast_date'
                }
              }
            ],
            pagination: {
              size: 10,
              from: 90
            }
          }
        }),
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })

      const data = await res.json()
      setMapData(data)

      const lat = data.result.modelBuf.centroids.geometry.coords[0]
      const lng = data.result.modelBuf.centroids.geometry.coords[1]

      setCoords({
        lat: formatCoords(lat),
        lng: formatCoords(lng)
      })

      return data
    }

    fetchMapData()
  }, [setMapData, setCoords, getAccessTokenSilently])

  if (isLoading) {
    return <Loader size="xl" />
  }

  return (
    <StyledMapViewer>
      <GoogleMapComponent
        center={coords}
        lng={0}
        lat={0}
        label={''}
        onDragEnd={function (): unknown {
          throw new Error('Function not implemented.')
        }}
      />
    </StyledMapViewer>
  )
}

export default withAuthenticationRequired(MapViewer, {
  onRedirecting: () => <Loader size="xl" />
})
