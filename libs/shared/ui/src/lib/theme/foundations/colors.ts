import { /*extendTheme,*/ theme as chakraTheme } from '@chakra-ui/react'
// import { mode } from '@chakra-ui/theme-tools'

export const colors = {
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
      50: '#def0ff',
      100: '#afd0ff',
      200: '#7db1ff',
      300: '#4b91ff',
      400: '#1a72ff',
      500: '#0058e6',
      600: '#0045b4',
      700: '#003182',
      800: '#001d51',
      900: '#000a21'
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

export default colors
