import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer' style={{background:"#269191"}}>
      <h4 className='text-center' style={{color:"#084547"}}>
        Copyright &copy; BuyFresh || All Rights Reserved.
      </h4>
      <p className="text-center mt-3" style={{color:"#084547"}}>
        <Link to="/about" style={{color:"#084547"}}>About</Link>
        |
        <Link to="/contact" style={{color:"#084547"}}>Contact</Link>
        |
        <Link to="/policy" style={{color:"#084547"}}>Privacy Policy</Link>
      </p>

    </div>
  )
}

export default Footer