import React from 'react'
import './Navbar.css'
import { assets } from '../../src/assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={assets.logo_new_t_bg} className='logo' alt="" />
        <img src={assets.icon_profile_add_admin} alt="" className="profile" />
    </div>
  )
}

export default Navbar
