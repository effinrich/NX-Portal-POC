import { Card, MapboxGL } from '@phc/shared-ui'
import { configPHC } from '@phc/shared-utils'
import styled from 'styled-components'
/* eslint-disable-next-line */
export interface HomeProps {}

const StyledHome = styled.div`
  color: black;
`
const mapboxToken = configPHC.mapboxToken

export function Home(props: HomeProps) {
  return (
    <StyledHome data-testid="home">
      <Card>
        <MapboxGL mapboxToken={mapboxToken} />
      </Card>
    </StyledHome>
  )
}

export default Home
