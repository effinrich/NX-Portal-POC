import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export function Nav() {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0<{
    name: string
  }>()
  const history = useHistory()
  const [pathname, setPathname] = useState(() => history.location.pathname)

  useEffect(() => {
    return history.listen(() => setPathname(pathname))
  }, [history, pathname])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">@auth0/auth0-react</span>
      <div className="collapse navbar-collapse">
        <div className="navbar-nav">
          <Link
            to="/"
            className={`nav-item nav-link${pathname === '/' ? ' active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/users"
            className={`nav-item nav-link${
              pathname === '/users' ? ' active' : ''
            }`}
          >
            Users
          </Link>
        </div>
      </div>

      {isAuthenticated ? (
        <div>
          <span id="hello">Hello, {user?.name}!</span>{' '}
          <button
            className="btn btn-outline-secondary"
            id="logout"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            logout
          </button>
        </div>
      ) : (
        <button
          className="btn btn-outline-success"
          id="login"
          onClick={() => loginWithRedirect()}
        >
          login
        </button>
      )}
    </nav>
  )
}
