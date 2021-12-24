import { render } from '@testing-library/react'

import Login from '.'

// eslint-disable-next-line react/jsx-no-useless-fragment
jest.mock('../../../../../libs/shared/ui/src/lib/MapboxGL', () => () => <></>)

describe('Login', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Login />)
    expect(baseElement).toBeTruthy()
  })
})
