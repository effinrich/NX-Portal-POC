import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'

export const Card = (props: BoxProps) => (
  <Box
    bg={useColorModeValue('white', 'gray.700')}
    maxWidth={props.maxW}
    mx="auto"
    p={{ base: '4', md: '6' }}
    rounded={{ sm: 'md' }}
    shadow={{ md: 'base' }}
    {...props}
  />
)

export default Card
