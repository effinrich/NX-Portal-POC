import { Link, Route } from 'react-router-dom'
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

      <ul>
        <li>
          <Link to="/">Location root</Link>
        </li>
      </ul>
      <Route path="/" element={<div>This is the Location root route.</div>} />
    </StyledLocation>
  )
}

export default Location
