import { render } from '@testing-library/react'

import MapViewer from '.'

// eslint-disable-next-line react/jsx-no-useless-fragment
jest.mock('../../components/MapboxGL', () => () => <></>)

describe('MapViewer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MapViewer />)
    expect(baseElement).toBeTruthy()
  })
})
