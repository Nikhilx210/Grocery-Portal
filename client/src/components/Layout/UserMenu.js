import React from 'react'
import { NavLink } from 'react-router-dom'
const UserMenu = () => {
  return (
    <>
            <div className='text-center'>
                <div className="list-group">
                    <h4 style={{color: "#0a5c5f"}}>Dashboard</h4>
                    <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action" style={{color: "#0a5c5f"}}>Profile</NavLink>
                    <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action" style={{color: "#0a5c5f"}}>Orders</NavLink>
                </div>
            </div>

        </>
  )
}

export default UserMenu