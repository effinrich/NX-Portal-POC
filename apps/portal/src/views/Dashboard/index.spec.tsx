import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import Dashboard from '.'

// eslint-disable-next-line react/jsx-no-useless-fragment
jest.mock('../../../../../libs/shared/ui/src/lib/MapboxGL', () => () => <></>)

describe('Dashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )
    expect(baseElement).toBeTruthy()
  })
})
