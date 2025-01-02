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
                <p>Add items</p>
            </NavLink>
            <NavLink to='/List' className="sidebar-option">
                <img src={assets.icon_order_b_simple} className='icon' alt="" />
                <p>Item list</p>
            </NavLink>
            <NavLink to = '/RecruitmentList' className="sidebar-option">
                <img src={assets.icon_order_b_simple}  className='icon' alt="" />
                <p>Recruitment list</p>
            </NavLink>
            <NavLink to = '/UserList' className="sidebar-option">
                <img src={assets.icon_order_b_simple}  className='icon' alt="" />
                <p>User list</p>
            </NavLink>
            <NavLink to = '/TeamList' className="sidebar-option">
                <img src={assets.icon_order_b_simple}  className='icon' alt="" />
                <p>Team List</p>
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
