import { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

import { configPHC } from './configPHC'
import { Providers } from './Providers'

const AllTheProviders: FC = ({ children }) => {
  return (
    <Providers
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
