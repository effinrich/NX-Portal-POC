// theme/index.js
import { extendTheme, ThemeConfig } from '@chakra-ui/react'

// Component style overrides
// import Button from './components/button'
// import breakpoints from './foundations/breakpoints'
// Foundational style overrides
// import borders from './foundations/borders'
// import colors from './foundations/colors'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#E5EFFF',
      100: '#B8D3FF',
      200: '#8AB7FF',
      300: '#5C9BFF',
      400: '#2E7EFF',
      500: '#0062FF',
      600: '#004ECC',
      700: '#003B99',
      800: '#002766',
      900: '#001433'
    }
  },
  shadows: {
    even: '0 1px 2px 0px rgba(0, 0, 0, 0.1), 0 1px 2px 0px rgba(0, 0, 0, 0.06)'
  },
  styles: {
    global: {
      'html, body': {
        bg: '#F2F2F2'
      }
    }
  }
})

export default theme

// Global style overrides
// import styles from './styles'

// const theme = {
//   colors,
//   breakpoints,
//   // Other foundational style overrides go here
//   components: {
//     // Button
//     // Other components go here
//   }
// }

// export default extendTheme(theme)
