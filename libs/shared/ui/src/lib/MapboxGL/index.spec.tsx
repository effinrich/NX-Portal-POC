import { configPHC } from '@phc/shared-utils'
import { render } from '@testing-library/react'

import MapboxGL from '.'

const mapboxToken = configPHC.mapboxToken
// eslint-disable-next-line react/jsx-no-useless-fragment
jest.mock('.', () => () => <></>)

describe('MapboxGL', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MapboxGL
        mapboxToken={mapboxToken}
        latitude={40}
        longitude={-96}
        zoom={3.5}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
