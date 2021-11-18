import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import '../../helpers/__mocks__/matchMedia'

import { PublicRoute } from './index'

describe('PublicRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <PublicRoute component={undefined} isAuthenticated={undefined} />
      </MemoryRouter>
    )
    expect(baseElement).toBeTruthy()
  })
})
