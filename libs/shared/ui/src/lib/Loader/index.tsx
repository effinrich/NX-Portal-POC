/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, /*, Skeleton*/ Spinner } from '@chakra-ui/react'

/* eslint-disable-next-line */
export interface LoaderProps {
  children?: any
  size?: string
}

export const Loader = ({ size = 'md' }: LoaderProps) => {
  return (
    <Flex align="center" justify="center" flex="1" height="75vh">
      <Spinner thickness="4px" speed="0.65s" size={size} color="brand.500" />
    </Flex>
  )
  // return <Suspense fallback={<Skeleton>{props.children}</Skeleton>}></Suspense>
}

export default Loader
