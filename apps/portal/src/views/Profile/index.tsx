import { useLocalStorage } from 'react-use'
import styled from 'styled-components'

import { UserProfile } from '../../components'

/* eslint-disable-next-line */
export interface ProfileProps {}

const StyledProfile = styled.div`
  color: black;
`

type DecodedToken = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: object
}

type Body = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  decodedToken: DecodedToken
}

type Profile = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  body: Body
}

const Profile = (props: ProfileProps) => {
  const [profile] = useLocalStorage<Profile>(
    '@@auth0spajs@@::O4WHfTk59tlLSzX3seoBR4uFosfIZUwu::project_pluto_324014::openid profile email read:users offline_access'
  )

  return (
    <StyledProfile>
      <UserProfile user={profile?.body.decodedToken.user} />
    </StyledProfile>
  )
}

export default Profile
