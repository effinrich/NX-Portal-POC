import { render } from '@testing-library/react'

import { PublicRoute } from '.'

describe('PublicRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PublicRoute children={undefined} isAuthenticated={undefined} />
    )
    expect(baseElement).toBeTruthy()
  })
})
