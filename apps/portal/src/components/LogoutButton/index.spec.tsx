import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import '../../utils/__mocks__/matchMedia'

import LogoutButton from '.'

describe('LogoutButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>
    )
    expect(baseElement).toBeTruthy()
  })
})
