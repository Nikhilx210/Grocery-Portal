import React, { useState,useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const CategoryProduct = () => {
    const[products,setProducts]=useState([]);
    const[category,setCategory]=useState({});
    const navigate=useNavigate();
    const params=useParams();
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
      <div className='container mt-3'>
        <h1 className='text-center'>{category?.name}</h1>
        <div className='d-flex flex-wrap' >
            {products.map((product) => {
              return <div className="card m-2" key={product.id} style={{ width: '18rem' }} >
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${product._id}`} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description.substring(0,30)}</p>
                  <p className="card-text">{`Rs ${product.price}`}</p>
                  <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${product.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-2">ADD To CART</button>
                </div>
              </div>
            })}
          </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct