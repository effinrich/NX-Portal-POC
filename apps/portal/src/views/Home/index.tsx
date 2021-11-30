import styled from 'styled-components'

import { Card, GoogleMapComponent } from '../../components'

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
        <GoogleMapComponent
          lng={-34.397}
          lat={150.644}
          label={''}
          onDragEnd={function (): unknown {
            throw new Error('Function not implemented.')
          }}
          center={props.coords}
        />
      </Card>
    </StyledHome>
  )
}

export default Home
