import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgetPassword from './pages/Auth/ForgetPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { useAuth } from './context/Auth';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
function App() {
  const [auth,setAuth]=useAuth();
  useEffect(() => {
    const getUser = async () => {
    //   try {
    //     const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/login/success`);
    //     console.log("Hello"+res)
    //     if (res && res.data.success) {
    //         toast.success(res.data.message);
    //         setAuth({
    //             ...auth,
    //             user: res.data.user,
    //             token: res.data.token
    //         })
    //         localStorage.setItem('auth',JSON.stringify(res.data));
    //     } else {
    //         // toast.error(res.data.message);
    //     }
    // } catch (error) {
    //     console.log(error);
    //     // toast.error("Somthing went wrong");
    // }
      fetch("http://localhost:4000/api/v1/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((res) => {
          localStorage.setItem('auth', JSON.stringify(res))
          setAuth({
            ...auth,
            user: res.user,
            token: res.token
        })
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/forget-password' element={<ForgetPassword/>} />
        <Route path='/register' element={!auth?.user ? <Register /> : <Navigate to="/" />} />
        <Route path='/login' element={!auth?.user ? <Login /> : <Navigate to="/" />} />
        <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path='user' element={<Dashboard/>} />
        <Route path='user/profile' element={<Profile/>} />
        <Route path='user/orders' element={<Orders/>} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashboard/>}/>
        <Route path='admin/create-category' element={<CreateCategory />} />
        <Route path='admin/create-product' element={<CreateProduct />} />
        <Route path='admin/products' element={<Products />} />
        <Route path='admin/product/:slug' element={<UpdateProduct />} />
        <Route path='admin/users' element={<Users />} />
        <Route path='admin/orders' element={<AdminOrders />} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;