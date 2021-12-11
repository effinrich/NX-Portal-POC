import { render } from '@testing-library/react'

import MapboxGL from '.'

// eslint-disable-next-line react/jsx-no-useless-fragment
jest.mock('.', () => () => <></>)

describe('MapboxGL', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MapboxGL />)
    expect(baseElement).toBeTruthy()
  })
})
