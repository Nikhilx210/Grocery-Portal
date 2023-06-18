import React, { useState,useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import '../styles/CartProductStyle.css'
const CategoryProduct = () => {
    const[products,setProducts]=useState([]);
    const[category,setCategory]=useState({});
    const navigate=useNavigate();
    const params=useParams();
    const [cart, setCart] = useCart();
    const getProductsByCat= async ()=>{
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.product);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getProductsByCat();
    },[params])
  return (
    <Layout>
      <div className='container mt-3 category' style={{marginLeft:"9%"}}>
        <h1 className='text-center' style={{color:"#468484"}}>{category?.name}</h1>
        <hr></hr>
        <div className='d-flex flex-wrap' >
        {products?.map((product) => {
              return <div className="card m-2" key={product.id} style={{ width: '18rem' ,backgroundColor:"white"}} >
                <img style={{alignSelf:'center'}} src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${product._id}`} className="card-img-top" alt={product.name} />
                <div className="card-body" style={{backgroundColor:"#c5fcfc"}}>
                  <div className='card-name-price'>
                    <h6 className="card-title">{product.name}</h6>
                    <h6 className="card-title card-price">{`Rs ${product.price}`}</h6>
                  </div>
                  <p className="card-text">{product.description.substring(0, 30)}</p>
                  <div className='card-name-price'>
                    <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${product.slug}`)}>More Details</button>
                    <button className="btn btn-secondary ms-2" onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem("cart", JSON.stringify([...cart, product]));
                      toast.success("Product Added to Cart");
                    }}>Add To Cart</button>
                  </div>
                </div>
              </div>
            })}
          </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct