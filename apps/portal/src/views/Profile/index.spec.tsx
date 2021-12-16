import { render } from '@testing-library/react'

import Profile from '.'

// const user = {
//   name: 'Rich Tillman',
//   picture:
//     'https://lh3.googleusercontent.com/a-/AOh14Gge9s8slfrdnSqWb_dSqCHaRvzbKTXZH8mre-DI=s96-c'
// }

// eslint-disable-next-line react/jsx-no-useless-fragment
jest.mock('../../components/MapboxGL', () => () => <></>)

describe('Profile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Profile />)
    expect(baseElement).toBeTruthy()
  })
})
