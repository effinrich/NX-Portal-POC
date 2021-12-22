import { render } from '@phc/shared-utils'

import Location from '.'

// eslint-disable-next-line react/jsx-no-useless-fragment
jest.mock('../../../../../libs/shared/ui/src/lib/MapboxGL', () => () => <></>)
describe('Location', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Location />)
    expect(baseElement).toBeTruthy()
  })
})
