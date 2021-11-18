import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

// import { AuthButton } from '../AuthButton'

export function Nav() {
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
      {/* <AuthButton /> */}
    </nav>
  )
}
