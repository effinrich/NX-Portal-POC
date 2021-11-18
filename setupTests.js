require('jest-fetch-mock').enableMocks()
const JSDOM = require('jsdom').JSDOM

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

global.crypto.subtle = {} // this gets around the 'auth0-spa-js must run on a secure origin' error