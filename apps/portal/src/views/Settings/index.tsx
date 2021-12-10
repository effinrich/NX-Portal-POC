import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Box } from '@chakra-ui/react'
import styled from 'styled-components'

import { Card, Loader, SettingsForm } from '../../components'
/* eslint-disable-next-line */
export interface SettingsProps {}

const StyledSettings = styled.div`
  /* color: black; */
  width: 100%;
`

const Settings = (props: SettingsProps) => {
  return (
    <StyledSettings>
      <Card>
        <SettingsForm />
      </Card>
    </StyledSettings>
  )
}

export default withAuthenticationRequired(Settings, {
  onRedirecting: () => <Loader size="xl" />
})
