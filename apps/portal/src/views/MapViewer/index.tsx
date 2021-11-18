import { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'

import { GoogleMapComponent, Loader } from '../../components'

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
  access_token: string
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

const MapViewer = (props: MapViewProps) => {
  const { isLoading, error, isAuthenticated } = useAuth0()
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

  const [profile] = useLocalStorage<Profile>(
    '@@auth0spajs@@::O4WHfTk59tlLSzX3seoBR4uFosfIZUwu::project_pluto_324014::openid profile email offline_access'
  )

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const authToken = `Bearer ${profile!.body.access_token!}`
    const url = 'https://rest.pluto.thepublichealthco.com/jwt/model_bufs'

    const fetchMapData = async () => {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          search_criteria: {
            search_condition: [
              {
                field_condition: [
                  {
                    field: 'id',
                    operation: 'EQUALS',
                    value: {
                      string_value: '123'
                    }
                  }
                ]
              }
            ],
            sorting_criteria: [
              {
                attribute: 'id',
                order: 'DESCENDING'
              }
            ]
          }
        }),
        headers: {
          Authorization: authToken,
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
  }, [profile, setMapData, setCoords])

  if (isLoading) {
    return <Loader />
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

export default MapViewer
