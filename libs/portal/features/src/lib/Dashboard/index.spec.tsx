import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import { Dashboard } from '.'

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
