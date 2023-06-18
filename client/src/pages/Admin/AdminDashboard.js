import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/Auth'

const AdminDashboard = () => {
  const[auth]=useAuth();
  return (
    <Layout title="Dashboard - Admin">
      <div className='container-fluid m-4 p-4'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu/>
          </div>
          <div className='col-md-9' >
            <div className='card w-75 p-3' style={{background: "#74cdcd" }}>
              <h3 style={{color: "#0a5c5f"}}>Admin Name : {auth?.user?.name}</h3>
              <h3 style={{color: "#0a5c5f"}}>Admin Email : {auth?.user?.email}</h3>
              <h3 style={{color: "#0a5c5f"}}>Admin Contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard