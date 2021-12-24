import { useEffect } from 'react'
import { useBoolean, useBreakpointValue } from '@chakra-ui/react'

export const useMobileMenuState = () => {
  const [isOpen, actions] = useBoolean()
  /* Orginally the next line reda lg: false.
  It controlled if the hamburger menu opened on moible only or not.*/
  const isMobile = useBreakpointValue({ base: true, lg: true })

  useEffect(() => {
    if (isMobile === false) {
      actions.off()
    }
  }, [isMobile, actions])

  return { isOpen, ...actions }
}
