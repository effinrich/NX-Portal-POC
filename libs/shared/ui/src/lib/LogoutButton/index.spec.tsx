import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import LogoutButton from '.'

expect.extend(toHaveNoViolations)

describe('LogoutButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LogoutButton />)
    expect(baseElement).toBeTruthy()
  })
  it('should be accessible', async () => {
    const { container } = render(<LogoutButton />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
