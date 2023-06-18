import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout>

      <div style={{background:"d8fdfd"}}>
        <h1 style={{color: "#468484"}}>About Us!</h1>
        <h3 style={{color: "#468484" , textAlign:"center" , fontWeight:"bold" , fontSize:"60px"}}>Welcome To <span id="W_Name1">Buy Fresh</span></h3>
        <p style={{color: "#468484" , textAlign:"center", fontSize:"20px" }}><span id="W_Name2">Buy Fresh</span> is a Professional <span id="W_Type1">eCommerece</span> Platform. Here we will provide you only interesting content, which you will like very much. We're dedicated to providing you the best of <span id="W_Type2">eCommerece</span>, with a focus on dependability and <span id="W_Spec">Online Grocery Shopping</span>. We're working to turn our passion for <span id="W_Type3">eCommerece</span> into a booming <a href="https://www.blogearns.com/2021/05/free-about-us-page-generator.html" rel="do-follow" style={{color: 'inherit', textDecoration: 'none'}}>online website</a>. We hope you enjoy our <span id="W_Type4">eCommerece</span> as much as we enjoy offering them to you.</p>
        <p style={{color: "#468484" , textAlign:"center" , fontSize:"20px" }}> I will keep posting more important posts on my Website for all of you. Please give your support and love.</p>
        <p style={{color: "#468484" , textAlign:"center" , fontWeight:"bold" ,fontSize:"30px"}}>Thanks For Visiting Our Site<br /><br />
        <span style={{color: "#468484" , textAlign:"center" , fontWeight:"bold" , fontSize:"30px"}}>Have a nice day!</span></p>
      </div>

    </Layout>
  )
}

export default About