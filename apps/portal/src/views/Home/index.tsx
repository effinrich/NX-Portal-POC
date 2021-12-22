import { Card, MapboxGL } from '@phc/shared-ui'
import styled from 'styled-components'

/* eslint-disable-next-line */
export interface HomeProps {}

const StyledHome = styled.div`
  color: black;
`

export function Home(props: HomeProps) {
  return (
    <StyledHome data-testid="home">
      <Card>
        <MapboxGL />
      </Card>
    </StyledHome>
  )
}

export default Home
