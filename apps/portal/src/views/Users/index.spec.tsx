import { QueryClient, QueryClientProvider } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@phc/shared-utils'

import Users from '.'

// eslint-disable-next-line react/jsx-no-useless-fragment
jest.mock('../../../../../libs/shared/ui/src/lib/MapboxGL', () => () => <></>)

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
