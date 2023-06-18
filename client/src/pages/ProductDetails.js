import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';
import '../styles/CartProductStyle.css'
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similarProduct, setsimilarProduct] = useState([]);
  const navigate=useNavigate();
    const [cart, setCart] = useCart();
  //get Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id,data?.product.category?._id);
    } catch (error) {
      console.log(error);
    }
  };
  //getSimilarProduct
  const getSimilarProduct = async (id,cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${id}/${cid}`
      );
      setsimilarProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) {
      getSingleProduct();
    }
  }, []);
  return (
    <Layout>
      <div className="row container mt-3">
        <div className="col-md-2 category" style={{background:'white',marginLeft:'2%'}}>
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${product._id}`}
            className="card-img-top"
            alt={product.name}
            style={{alignSelf:'center',marginLeft:'20%'}}
          />
        </div>
        <div className="col-md-8 ">
            <h1 className="" style={{color: "#0a5c5f"}}>Product Details</h1>
            <h6 style={{color:"#468484"}}> Name : {product.name}</h6>
            <h6 style={{color:"#468484"}}> Description : {product.description}</h6>
            <h6 style={{color:"#468484"}}> Price : {product.price}</h6>
            <h6 style={{color:"#468484"}}> Category :{product?.category?.name}</h6>
            <button className="btn btn-secondary ms-2">ADD To CART</button>
        </div>
      </div>
      <hr/>
      <div className="row container category">
        <h3 style={{color: "#0a5c5f"}}>Similar Products : </h3>
        {similarProduct.length <1 && <p className="text-center">No Similar Product Found : </p>}
      <div className='d-flex flex-wrap' >
            {similarProduct.map((product) => {
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
  );
};

export default ProductDetails;