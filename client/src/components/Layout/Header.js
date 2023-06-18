import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import i from '../../images/Icon.png'
import { useAuth } from '../../context/Auth'
import { toast } from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import useCategory from '../hooks/useCategory'
import { useCart } from '../../context/cart'
import { Badge } from 'antd'
const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    })
    localStorage.removeItem('auth');
    localStorage.removeItem('cart');
    
    fetch("http://localhost:4000/api/v1/auth/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .catch((err) => {
          console.log(err);
        });
    toast.success("Logout SuccessFully");
  }
  return (
    <> 
      <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary navbarcolor" style={{padding:0}}> 
        <div style={{background: "#74cdcd" , padding: "8px"}} className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <img src={i}></img><Link to="/" className="navbar-brand" style={{ textTransform: "none" , color: "#0a5c5f" , fontWeight:"800" , fontFamily:"sans-serif"}} >BuyFresh</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item" style={{ marginLeft: "3%" }}>
                <NavLink to="/" className="nav-link" aria-current="page" style={{color: "#0a5c5f"}}>Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to='/categories' role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color: "#0a5c5f"}}>
                  Categories
                </Link>
                <ul className="dropdown-menu" style={{color: "#0a5c5f"}}>
                  {categories.map((c) => {
                    return <li ><Link style={{color: "#0a5c5f"}} to={`/category/${c?.slug}`} className="dropdown-item" >{c?.name}</Link></li>
                  })}

                </ul>
              </li>

              {!auth.user && <li className="nav-item">
                <NavLink to="/register" className="nav-link" style={{color: "#0a5c5f"}}>SignUp</NavLink>
              </li>}
              {!auth.user && <li className="nav-item">
                <NavLink to="/login" className="nav-link" style={{color: "#0a5c5f"}}>Login</NavLink>
              </li>}
              {auth.user && <li className="nav-item dropdown ">
                <NavLink className="nav-link dropdown-toggle dropdesign"  style={{color: "#0a5c5f"}} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {auth.user.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item" style={{color: "#0a5c5f"}}>Dashboard</NavLink></li>
                  <li>
                    <NavLink onClick={handleLogout} className="dropdown-item" to="/login" style={{color: "#0a5c5f"}} >Logout</NavLink>
                  </li>
                </ul>
              </li>
              }
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                    <NavLink to="/cart"  className="nav-link" style={{color: "#0a5c5f"}}>Cart</NavLink>
                </Badge>
              </li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header