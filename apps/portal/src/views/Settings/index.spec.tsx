import { render } from '@testing-library/react'

import Settings from '.'

describe('Settings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Settings />)
    expect(baseElement).toBeTruthy()
  })
})
