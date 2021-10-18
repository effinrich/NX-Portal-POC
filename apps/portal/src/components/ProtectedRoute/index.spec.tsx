import { render } from '@testing-library/react'

import { ProtectedRoute } from '.'

describe('SharedUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProtectedRoute />)
    expect(baseElement).toBeTruthy()
  })
})
