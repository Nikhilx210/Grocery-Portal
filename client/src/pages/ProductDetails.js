import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similarProduct, setsimilarProduct] = useState([]);
  const navigate=useNavigate();
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
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={'300'}
            width={'300'}
          />
        </div>
        <div className="col-md-6 ">
            <h1 className="text-center">Product Details</h1>
            <h6> Name : {product.name}</h6>
            <h6> Description : {product.description}</h6>
            <h6> Price : {product.price}</h6>
            <h6> Category :{product?.category?.name}</h6>
            <button className="btn btn-secondary ms-2">ADD To CART</button>
        </div>
      </div>
      <hr/>
      <div className="row container">
        <h3>Similar Products : </h3>
        {similarProduct.length <1 && <p className="text-center">No Similar Product Found : </p>}
      <div className='d-flex flex-wrap' >
            {similarProduct.map((product) => {
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
  );
};

export default ProductDetails;
