import { QueryClient, QueryClientProvider } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import Users from '.'

// eslint-disable-next-line react/jsx-no-useless-fragment
jest.mock('../../components/MapboxGL', () => () => <></>)

const queryClient = new QueryClient()

describe('Users', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Users />
        </MemoryRouter>
      </QueryClientProvider>
    )
    expect(baseElement).toBeTruthy()
  })
})
