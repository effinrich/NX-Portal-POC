// theme.js
import { extendTheme } from '@chakra-ui/react'

export const button = extendTheme({
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: 'semibold', // Normally, it is "semibold",
        h: '40px'
      },
      // 2. We can add a new button size or extend existing
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px'
        }
      },
      // 3. We can add a new visual variant
      variants: {
        // 4. We can override existing variants
        solid: props => ({
          bg: props.colorMode === 'dark' ? 'red.300' : 'red.500'
        })
      }
    }
  }
})

export default button
