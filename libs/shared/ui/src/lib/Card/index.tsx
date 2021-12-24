import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'

export const Card = (props: BoxProps) => (
  <Box
    bg={useColorModeValue('white', 'gray.700')}
    maxWidth={props.maxW}
    mx="auto"
    p={{ base: '4', md: '6' }}
    borderRadius={['xl', '2xl']}
    borderWidth="1px"
    borderColor="gray.200"
    shadow="even"
    {...props}
  />
)

export default Card
