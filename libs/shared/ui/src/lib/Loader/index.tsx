/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react'
import { Skeleton } from '@chakra-ui/react'
import { ReactComponentElement } from 'hoist-non-react-statics/node_modules/@types/react'

/* eslint-disable-next-line */
export interface LoaderProps {
  children: any
}

export function Loader(props: LoaderProps) {
  return <Suspense fallback={<Skeleton>{props.children}</Skeleton>}></Suspense>
}

export default Loader
