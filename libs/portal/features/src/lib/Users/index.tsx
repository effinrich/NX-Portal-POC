import { Link, Route } from 'react-router-dom'
import styled from 'styled-components'

/* eslint-disable-next-line */
export interface UsersProps {}

const StyledUsers = styled.div`
  color: pink;
`

export function Users(props: UsersProps) {
  return (
    <StyledUsers>
      <h1>Welcome to Users!</h1>

      <ul>
        <li>
          <Link to="/">features-users root</Link>
        </li>
      </ul>
      <Route
        path="/"
        render={() => <div>This is the features-users root route.</div>}
      />
    </StyledUsers>
  )
}

export default Users
