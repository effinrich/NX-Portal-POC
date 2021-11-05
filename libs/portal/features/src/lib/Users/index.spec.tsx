import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

// import '@phc-portal/shared-utils/matchMedia'
import Users from '.'

describe('Users', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    )
    expect(baseElement).toBeTruthy()
  })
})
