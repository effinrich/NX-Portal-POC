// theme/index.js
import { extendTheme } from '@chakra-ui/react'

// Component style overrides
// import Button from './components/button'
import breakpoints from './foundations/breakpoints'
// Foundational style overrides
// import borders from './foundations/borders'
import colors from './foundations/colors'
// Global style overrides
// import styles from './styles'

const theme = {
  colors,
  breakpoints,
  // Other foundational style overrides go here
  components: {
    // Button
    // Other components go here
  }
}

export default extendTheme(theme)
