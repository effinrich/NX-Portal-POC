import { Box, Container } from '@chakra-ui/react'
import styled from 'styled-components'

import { Card } from '../../components'
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
        <Box lineHeight="tall">This is the Settings view</Box>
      </Card>
    </StyledSettings>
  )
}

export default Settings
