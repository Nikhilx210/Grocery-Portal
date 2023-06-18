import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import  { Toaster } from 'react-hot-toast';
import '../../styles/AuthStyle.css'
const Layout = (props) => {
  return (
    <div >
      <Helmet>
        <meta charSet='utf-8' />
        <div>
          <meta name="description" content={props.description} />
          <meta name="keywords" content={props.keywords} />
          <meta name="author" content={props.author} />
        </div>
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <main  style={{ minHeight: "90vh" ,overflowX:'hidden'  }}>
        <Toaster />
        {props.children}
      </main>
      <Footer />
    </div>
  )
}
Layout.defaultProps={
  title:'BuyFresh',
  description:'Mern Stact Project',
  keywords:"Mern Stack",
  author:"Team210"
}

export default Layout