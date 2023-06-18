import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="list-group">
                    <h4 style={{color: "#0a5c5f"}}>Admin Panel</h4>
                    <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action" style={{color: "#0a5c5f"}}>Create Category</NavLink>
                    <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action" style={{color: "#0a5c5f"}}>Create Product</NavLink>
                    <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action" style={{color: "#0a5c5f"}}>Products</NavLink>
                    <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action" style={{color: "#0a5c5f"}}>Orders</NavLink>
                    {/* <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action" style={{color: "#0a5c5f"}}>Users</NavLink> */}
                </div>
            </div>

        </>
    )
}

export default AdminMenu