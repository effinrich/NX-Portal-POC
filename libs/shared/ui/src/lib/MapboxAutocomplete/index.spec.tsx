import { render } from '@testing-library/react'

import MapboxAutocomplete from '.'

describe('MapboxAutocomplete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MapboxAutocomplete />)
    expect(baseElement).toBeTruthy()
  })
})
