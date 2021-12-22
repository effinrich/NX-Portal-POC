// import { Link, Route } from 'react-router-dom'
import styled from 'styled-components'

/* eslint-disable-next-line */
export interface LocationProps {}

const StyledLocation = styled.div`
  color: pink;
`

export function Location(props: LocationProps) {
  return (
    <StyledLocation>
      <h1>Welcome to Location!</h1>
    </StyledLocation>
  )
}

export default Location
