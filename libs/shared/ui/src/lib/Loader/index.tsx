/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react'
import { Skeleton } from '@chakra-ui/react'

/* eslint-disable-next-line */
export interface LoaderProps {
  children?: any
}

export const Loader = (props: LoaderProps) => {
  return <Suspense fallback={<Skeleton>{props.children}</Skeleton>}></Suspense>
}

export default Loader
