import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
const Profile = () => {
  return (
    <Layout title="Dashboard - Profile">
      <div className='container-fluid m-4 p-4'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu/>
          </div>
          <div className='col-md-9'>
            <h1>Profile</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile