import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import LoginButton from '.'

expect.extend(toHaveNoViolations)

describe('LoginButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoginButton />)
    expect(baseElement).toBeTruthy()
  })
  it('should be accessible', async () => {
    const { container } = render(<LoginButton />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
