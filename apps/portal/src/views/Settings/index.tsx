import { Card, SettingsForm } from '@phc/shared-ui'
import styled from 'styled-components'
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

export default Settings
