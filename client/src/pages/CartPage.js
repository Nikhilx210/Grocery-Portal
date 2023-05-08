import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const[instance,setInstance]=useState('');
  const[loading,setLoading]=useState(false);
  const[clientToken,setClientToken]=useState("");
  const navigate = useNavigate();
  //total price
  const totalPrice =()=>{
    try {
      let total=0
      cart?.map(item => {total+=item.price});
      return total;
    } catch (error) {
      console.log(error);
    }
  }
  const removeItem=(pid)=>{
    try {
      let mycart=[...cart];
      mycart=mycart.filter(item => item._id!==pid)
      setCart(mycart);
      localStorage.setItem("cart",JSON.stringify(mycart))
    } catch (error) {
      console.log(error);
    }
  }
  //payment gateway token
  const getToken =async()=>{
    try {
      const{data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  }
  //handle payment
  const handlePayment = ()=>{}
  useEffect(()=>{
    getToken();
  },[auth?.token])
  return <Layout title={"BuyFresh-Cart"}>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center bg-light p-2 mb-1">
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className="text-center">
            {cart?.length > 0 ? `You have ${cart.length} Item in your Cart ${auth?.token? "": "Please login to Checkout"} `: "Your Cart is Empty"}
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          {cart?.map(p=> {
            return <div className="row card mb-2 p-3 flex-row">
              <div className="col-md-4">
              <img src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${p._id}`} className="card-img-top" alt={p.name} height={200} width={200}/>
              </div>
              <div className="col-md-4">
                <p>{p.name}</p>
                <p>{p?.description?.substring(0,30)}</p>
                <p>{p.price}</p>
                <button className="btn btn-danger" onClick={()=>removeItem(p._id)}>Remove</button>
                {p._id}
              </div>
            </div>
          })}
        </div>
        <div className="col-md-4 text-center">
          <h2>Cart Summary</h2>
          <p>Total | Checkout | Payment</p>
          <hr/>
          <h4>Rs : {totalPrice()}</h4>
          {auth?.user?.address ? (
            <>
            <div className="mb-3">
              <h4>Current Address</h4>
              <h5>{auth?.user?.address}</h5>
              <button className="btn btn-outline-warning" onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
            </div>
            </>
          ) : (
            <div>
              {
                auth?.token ? (
                  <button className="btn btn-outline-warning" onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
                ) :(
                  <button className="btn btn-outline-warning" onClick={()=>navigate('/login',{state:'/cart'})}>Please Login to Checkout</button>
                )
              }
            </div>
          )}
          <div className="mt-2">
              <DropIn
                options={{
                  authorization:clientToken,
                  paypal:{
                    flow:'vault'
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
              <button className="btn btn-primary" onClick={handlePayment}>Make Payment</button>
          </div>
        </div>
      </div>
    </div>
  </Layout>;
};

export default CartPage;