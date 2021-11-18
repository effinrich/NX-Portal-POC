import { render } from '@testing-library/react'

import Home from '.'

describe('Home', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Home coords={{ lat: 0, lng: 0 }} />)
    expect(baseElement).toBeTruthy()
  })
})
