import { render } from '@testing-library/react'

import Settings from '.'

// eslint-disable-next-line react/jsx-no-useless-fragment
jest.mock('../../../../../libs/shared/ui/src/lib/MapboxGL', () => () => <></>)

describe('Settings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Settings />)
    expect(baseElement).toBeTruthy()
  })
})
