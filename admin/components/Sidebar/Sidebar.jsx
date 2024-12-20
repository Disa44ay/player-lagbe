import React from 'react'
import './Sidebar.css'
import { assets } from '../../src/assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-opions">
            <NavLink to='/Add' className="sidebar-option">
                <img src={assets.icon_plus_t_bg} className='icon' alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/List' className="sidebar-option">
                <img src={assets.icon_order_b_simple} className='icon' alt="" />
                <p>Item list</p>
            </NavLink>
            <NavLink to = '/Orders' className="sidebar-option">
                <img src={assets.icon_order_b_simple}  className='icon' alt="" />
                <p>Orders</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
