import { render } from '@testing-library/react'

import LoginButton from '.'

describe('LoginButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoginButton />)
    expect(baseElement).toBeTruthy()
  })
})
