import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import '../styles/CartProductStyle.css'
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientToken, setClientToken] = useState("");
  const navigate = useNavigate();
  //total price
  const totalPrice = () => {
    try {
      let total = 0
      cart?.map(item => { total += item.price });
      return total;
    } catch (error) {
      console.log(error);
    }
  }
  const removeItem = (pid) => {
    try {
      let mycart = [...cart];
      mycart = mycart.filter(item => item._id !== pid)
      setCart(mycart);
      localStorage.setItem("cart", JSON.stringify(mycart))
    } catch (error) {
      console.log(error);
    }
  }
  //payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  }
  //handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce, cart
      })
      setLoading(false);
      localStorage.removeItem("cart")
      setCart([])
      navigate('/dashboard/user/orders')
      toast.success("Order Have Been Placed")
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getToken();
  }, [auth?.token])
  return <Layout title={"BuyFresh-Cart"}>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center p-2 mb-1" style={{ color: "#0a5c5f" }}>
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className="text-center" style={{ color: "#468484" }}>
            {cart?.length > 0 ? `You have ${cart.length} Item in your Cart ${auth?.token ? "" : "Please login to Checkout"} ` : "Your Cart is Empty"}
          </h4>
        </div>
      </div>
      <div className="row category">
        <div className="col-md-9 d-flex flex-wrap">
          {cart?.map(product => {
            return <div className="card m-2" key={product.id} style={{ width: '18rem', backgroundColor: "white" }} >
              <img style={{ alignSelf: 'center' }} src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${product._id}`} className="card-img-top" alt={product.name} />
              <div className="card-body" style={{ backgroundColor: "#c5fcfc" }}>
                <div className='card-name-price'>
                  <h6 className="card-title">{product.name}</h6>
                  <h6 className="card-title card-price">{`Rs ${product.price}`}</h6>
                </div>
                <p className="card-text">{product.description.substring(0, 30)}</p>
                <div className='card-name-price'>
                  <button className="btn btn-danger" onClick={() => removeItem(product._id)}>Remove</button>
                </div>
              </div>
            </div>
          })}
        </div>
        <div className="col-md-3 text-center">
          <h2 style={{ color: "#468484" }}>Cart Summary</h2>
          <p>Total | Checkout | Payment</p>
          <hr />
          <h4>Rs : {totalPrice()}</h4>
          {auth?.user?.address ? (
            <>
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button className="btn btn-danger" onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
              </div>
            </>
          ) : (
            <div>
              {
                auth?.token ? (
                  <button className="btn btn-danger" onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                ) : (
                  <button className="btn btn-danger" onClick={() => navigate('/login', { state: '/cart' })}>Please Login to Checkout</button>
                )
              }
            </div>
          )}
          <div className="mt-2">
            {
              !clientToken || !cart?.length ? ("") : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: 'vault'
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                </>
              )
            }
            <button className="btn btn-primary" onClick={handlePayment} disabled={loading || !instance || !auth?.user?.address}>{loading ? "Processing ...." : "Make Payment"}</button>
          </div>
        </div>
      </div>
    </div>
  </Layout>;
};

export default CartPage;