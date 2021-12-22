import { useParams } from 'react-router-dom'
import { useGetLocation } from '@phc/shared-data-assets'
import { MapboxGL } from '@phc/shared-ui'
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
  console.log('data = ', data && data.features[0].center[0])

  return (
    <StyledLocation>
      {data && (
        <MapboxGL
          mapboxToken={mapboxToken}
          latitude={data.features[0].center[0]}
        />
      )}
    </StyledLocation>
  )
}

export default Location
