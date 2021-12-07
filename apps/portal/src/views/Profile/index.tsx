import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import styled from 'styled-components'

import { Loader, UserProfile } from '../../components'

/* eslint-disable-next-line */
export interface ProfileProps {}

const StyledProfile = styled.div`
  color: black;
`

const Profile = (props: ProfileProps) => {
  const { user } = useAuth0()

  return (
    <StyledProfile>
      <UserProfile user={user} />
    </StyledProfile>
  )
}

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loader size="xl" />
})
