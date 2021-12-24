import { FC, ReactElement } from 'react'
import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { Providers } from '@phc/shared-helpers'
import { render, RenderOptions } from '@testing-library/react'

import { configPHC } from './configPHC'

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

const AllTheProviders: FC = ({ children }) => {
  return (
    <Providers
      theme={theme}
      domain={configPHC.auth0Domain}
      clientId={configPHC.auth0ClientId}
      audience={configPHC.auth0Audience}
    >
      {children}
    </Providers>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
