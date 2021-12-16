import { render } from '@testing-library/react'

import Login from '.'

// eslint-disable-next-line react/jsx-no-useless-fragment
jest.mock('../../components/MapboxGL', () => () => <></>)

describe('Login', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Login />)
    expect(baseElement).toBeTruthy()
  })
})
