import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  CloseButton,
  Flex
} from '@chakra-ui/react'
import fetch from 'cross-fetch'
import styled from 'styled-components'

import { Card, GoogleMapComponent, Loader } from '../../components'

/* eslint-disable-next-line */
export interface HomeProps {
  coords: {
    lat: number
    lng: number
  }
}

const StyledHome = styled.div`
  color: black;
`

const Home = (props: HomeProps) => {
  return (
    <StyledHome>
      <Card>
        <GoogleMapComponent
          lng={-34.397}
          lat={150.644}
          label={''}
          onDragEnd={function (): unknown {
            throw new Error('Function not implemented.')
          }}
          center={props.coords}
        />
      </Card>
      {/* <Flex w="100%" flexDirection={['column', 'row']}>
        <Box p={2} w={['100%', '50%']}>
          <Card></Card>
        </Box>

        <Box p={2} w={['100%', '50%']}>
          <Card>
            <GoogleMapComponent center={props.coords} />
          </Card>
        </Box>
      </Flex> */}
    </StyledHome>
  )
}

export default Home
