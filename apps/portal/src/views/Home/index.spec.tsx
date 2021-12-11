import { render } from '@testing-library/react'

import Home from '.'

// eslint-disable-next-line react/jsx-no-useless-fragment
jest.mock('../../components/MapboxGL', () => () => <></>)

describe('Home', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Home coords={{ lat: 0, lng: 0 }} />)
    expect(baseElement).toBeTruthy()
  })
})
