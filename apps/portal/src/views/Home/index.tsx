import styled from 'styled-components'

import { Card, MapboxGL } from '../../components'

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
      </Card>
    </StyledHome>
  )
}

export default Home
