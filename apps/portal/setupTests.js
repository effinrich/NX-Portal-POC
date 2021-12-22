import React from 'react'

import '@testing-library/jest-dom/extend-expect'

require('jest-fetch-mock').enableMocks()

// eslint-disable-next-line react/jsx-no-useless-fragment
jest.mock('libs/shared/ui/src/lib/MapboxGL', () => () => <></>)

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noOp() {}

if (typeof window.URL.createObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'createObjectURL', { value: noOp })
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length)
  }
})

React.useLayoutEffect = React.useEffect

global.crypto.subtle = {} // this gets around the 'auth0-spa-js must run on a secure origin' error
