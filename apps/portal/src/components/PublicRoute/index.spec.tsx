import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import '../../utils/__mocks__/matchMedia'

import { PublicRoute } from '.'

describe('PublicRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <PublicRoute children={undefined} isAuthenticated={undefined} />
      </MemoryRouter>
    )
    expect(baseElement).toBeTruthy()
  })
})
