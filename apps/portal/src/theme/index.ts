import { theme as chakraTheme } from '@chakra-ui/react'

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    brand: {
      100: '#595959',
      200: '#404040',
      300: '#262626',
      400: '#0d0d0',
      500: '#000',
      600: '#000',
      700: '#000',
      800: '#000',
      900: '#000'
    },
    primary: {
      50: '#dff1ff',
      100: '#afd3ff',
      200: '#7db5ff',
      300: '#4b98ff',
      400: '#1a7afe',
      500: '#0161e5',
      600: '#004bb3',
      700: '#003681',
      800: '#002050',
      900: '#000c20'
    },
    error: {
      50: '#ffe6e4',
      100: '#fcbab8',
      200: '#f48e8a',
      300: '#ee625d',
      400: '#e93630',
      500: '#cf1d16',
      600: '#a21511',
      700: '#750d0b',
      800: '#470604',
      900: '#1e0000'
    },
    success: {
      50: '#e3fbee',
      100: '#c3ebd7',
      200: '#a0dcbf',
      300: '#7ccda7',
      400: '#59bf8e',
      500: '#40a674',
      600: '#30815a',
      700: '#205c40',
      800: '#0e3825',
      900: '#001509'
    },
    opacity: {
      transparent: 'transparent',
      transparentBlack: 'rgba(0,0,0,0.1)',
      transparentWhite: 'rgba(255,255,255,0.5)'
    }
  },
  transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  gridGutter: 1 // rem - taken from Chakra UI space scale https://chakra-ui.com/theme#spacing
}

export { theme }
