import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"])

  const navigate = useNavigate()
  const logout = () => {
    setCookies("access_token", '')
    window.localStorage.removeItem("userID")
    navigate('/auth')
  }

  return (
    <nav className="flex flex-wrap sticky top-0 z-10 items-center justify-between gap-5 p-5 bg-black text-white text-lg md:text-2xl md:gap-10 lg:gap-14">
      <div className="flex-grow flex justify-center md:justify-start list-none gap-5">
        <NavLink to='/' className={(e) => { return e.isActive ? 'text-red-500 transition-all duration-150' : '' }}><li>Home</li></NavLink>
        <NavLink to='/create-recipe' className={(e) => { return e.isActive ? 'text-red-500 transition-all duration-150' : '' }}><li>Create</li></NavLink>
        <NavLink to='/saved-recipe' className={(e) => { return e.isActive ? 'text-red-500 transition-all duration-150' : '' }}><li>Wishlist</li></NavLink>
        {/* <NavLink to='/auth' className={(e)=> {return e.isActive? 'text-red-500 transition-all duration-150' : ''}}><li>Authentication</li></NavLink> */}
      </div>

      <div className="flex items-center justify-center list-none">
        {!cookies.access_token ? (
          <NavLink to='/auth' className={(e) => { return e.isActive ? 'text-red-500 transition-all duration-150' : '' }}>
            <li>Register/Login</li>
          </NavLink>
        ) : (
          <button
            className="text-black bg-red-400 rounded-md font-bold py-2 px-6 text-base md:text-xl"
            onClick={logout}
          >
            LogOut
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
