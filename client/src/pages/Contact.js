import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'
const Contact = () => {
  return (
    <Layout>
      <div >
        <h1 style={{color: "#468484"}}>Contact Us !</h1>
        <h2 style={{color: "#468484" , textAlign:"center" , fontWeight:"bold" , fontSize:"60px"}}>Welcome to <span id="W_Name"> Buy Fresh</span>!</h2>
        <p style={{color: "#468484" , textAlign:"center" , fontSize:"20px"}}>Please email us if you have any queries about the site, advertising, or anything else.</p>
        <div >
          <img alt="contact-us" height={87} style={{marginLeft:"590px"}} src="https://lh3.googleusercontent.com/-BA7qy8h_v1g/YLVCWDNZdCI/AAAAAAAAALw/rsHNJWX0BK4P5CuB0ymG8QkJ9A9E8KchgCLcBGAsYHQ/w320-h87/email-us-1805514__480.webp" width={320} />
          <p style={{color: "#468484" , textAlign:"center" , marginTop:"10px"}}><i className="fas fa-envelope-open-text"  /> <b><i> <span id="W_Email"><Link href="mailto:buyfresh210@gmail.com">buyfresh210@gmail.com</Link></span></i></b><br />
            </p>
          <h3 style={{color: "#468484" , fontSize:"25px" , textAlign:"center" }}>We will revert you as soon as possible...!</h3>
          <p style={{color: "#468484" , fontSize:"25px" , textAlign:"center" }}>Thank you for contacting us! <br /><b style={{fontSize:"30px"}}>Have a great day</b></p>
        </div>
      </div>


    </Layout>
  )
}

export default Contact