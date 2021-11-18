import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import ProtectedRoute from '.'

describe('ProtectedRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>
    )
    expect(baseElement).toBeTruthy()
  })
})
