/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Suspense } from 'react'
import { Center, Spinner /*, Skeleton*/ } from '@chakra-ui/react'

/* eslint-disable-next-line */
export interface LoaderProps {
  children?: any
  size?: string
}

export const Loader = ({ size }: LoaderProps) => {
  return (
    <Center>
      <Spinner thickness="4px" speed="0.65s" size={size} />
    </Center>
  )
  // return <Suspense fallback={<Skeleton>{props.children}</Skeleton>}></Suspense>
}

export default Loader
