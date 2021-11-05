import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import '../../utils/__mocks__/matchMedia'

import { AuthButton } from '.'

describe('AuthButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <AuthButton />
      </MemoryRouter>
    )
    expect(baseElement).toBeTruthy()
  })
})
