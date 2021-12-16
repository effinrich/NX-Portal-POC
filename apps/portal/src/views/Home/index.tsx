import { withAuthenticationRequired } from '@auth0/auth0-react'
import styled from 'styled-components'

import { Card, GoogleMapComponent, Loader, MapboxGL } from '../../components'

/* eslint-disable-next-line */
export interface HomeProps {
  coords: {
    lat: number
    lng: number
  }
}

const StyledHome = styled.div`
  color: black;
`

const Home = (props: HomeProps) => {
  return (
    <StyledHome>
      <Card>
        <MapboxGL />
        {/* <GoogleMapComponent
          lng={-34.397}
          lat={150.644}
          label={''}
          onDragEnd={function (): unknown {
            throw new Error('Function not implemented.')
          }}
          center={props.coords}
        /> */}
      </Card>
    </StyledHome>
  )
}

export default withAuthenticationRequired(Home, {
  onRedirecting: () => <Loader size="xl" />
})
