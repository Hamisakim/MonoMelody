import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { getPayloadFromToken, userIsAuthenticated } from '../../helpers/authHelp'
// import { toastifyPopUp } from '../../helpers/popUps'

import './navbar.scss'
import logo from '../../assets/color-logo.svg'

const NavBar = () => {
  const [userId, setUserId] = useState(null)
  // console.log('🐝 ~ file: NavBar.js ~ line 10 ~ userId', userId)

  const location = useLocation()
  useEffect(() => {

  }, [location.pathname])

  const history = useHistory()
  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  useEffect(() => {
    const payload = getPayloadFromToken()
    const userId = payload.sub
    setUserId(userId)
  }, [getPayloadFromToken()])


  const logoStyle = {
    width: '100px',
   
  }

  //make a onclick change the state or something 
  const [isActive, setIsActive] = useState(false)

  return (
    <nav className="navbar custom-nav">
      <div className="container">
        <div className="navbar-brand">

          <Link className='navbar-logo-link' to="/" >
            <img src={logo} style={logoStyle} alt='logo'/>
          </Link>
          
          <a onClick={() => {
            setIsActive(!isActive) 
          }}role="button" className={`navbar-burger burger ${isActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false">

            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        
        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            {/* { userIsAuthenticated() &&
        <>
          <Link  to={`/profile/${userId}`} onClick={() => {
            setIsActive(!isActive) 
          }}className="navbar-item" >Profile</Link>
        </>
            } */}
            <Link to="/create" onClick={() => {
              setIsActive(!isActive) 
            }}className="navbar-item">Create</Link>

            <Link to="/gallery" onClick={() => {
              setIsActive(!isActive) 
            }} className="navbar-item">Explore</Link>
          
          </div>

          <div className="navbar-end">
            { userIsAuthenticated() &&
        <>
          <Link  to={`/profile/${userId}`} onClick={() => {
            setIsActive(!isActive) 
          }}className="navbar-item" >Profile</Link>
        </>
            }


            { !userIsAuthenticated() &&
        <>
        
          <Link to="/register"onClick={() => {
            setIsActive(!isActive) 
          }} className="navbar-item">
            Sign Up
          </Link>

          <Link to="/login"onClick={() => {
            setIsActive(!isActive) 
          }} className="navbar-item">
            Login
          </Link>
        </>
            }
            { userIsAuthenticated() &&
        <>
          <div className="navbar-item"  onClick={() => {
            setIsActive(!isActive), handleLogout()
          }}>
            Logout
          </div>
        </>
            }
          </div>
        </div>

      </div>
    </nav>
  )
}

export default NavBar
