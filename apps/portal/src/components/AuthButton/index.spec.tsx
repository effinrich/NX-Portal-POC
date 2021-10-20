import { render } from '@testing-library/react'

import { AuthButton } from '.'

describe('AuthButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthButton />)
    expect(baseElement).toBeTruthy()
  })
})
