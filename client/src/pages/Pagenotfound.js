import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
  return (
    <Layout>
        <div className='pnf'>
          <h1 className='pnf-title' style={{color: "#0a5c5f"}}>404</h1>
          <h2 className='pnf-heading' style={{color: "#468484"}}>Oops ! Page Not Found</h2>
          <Link to="/" className='pnf-btn' style={{color: "#468484"}}>Go Back</Link>
        </div>
    </Layout>
  )
}

export default Pagenotfound