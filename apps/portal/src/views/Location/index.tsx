import { useParams } from 'react-router-dom'
import { useGetLocation } from '@phc/shared-data-assets'
import { Card, MapboxGL } from '@phc/shared-ui'
import { configPHC } from '@phc/shared-utils'
import styled from 'styled-components'
/* eslint-disable-next-line */
export interface LocationProps {}

const StyledLocation = styled.div`
  color: 'brand';
`

const mapboxToken = configPHC.mapboxToken

export function Location(props: LocationProps) {
  const { id } = useParams()

  const { data } = useGetLocation(id)

  return (
    <StyledLocation>
      <Card p={0}>
        {data && (
          <MapboxGL
            isCenterGeo
            zoom={8}
            mapboxToken={mapboxToken}
            latitude={data.features[0].center[1]}
            longitude={data.features[0].center[0]}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          />
        )}
      </Card>
    </StyledLocation>
  )
}

export default Location
