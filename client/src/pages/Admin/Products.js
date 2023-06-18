import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/CartProductStyle.css'
const Products = () => {
    const [products, setProducts] = useState([]);
    //get all category
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
            console.log(data);
            if (data?.success) {
                setProducts(data?.product);
                console.log(products)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong in Retrieving Products");
        }
    };
    useEffect(() => {
        getAllProducts();
    }, [])
    return (
        <Layout>
            <div className='container-fluid m-4 p-4'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center' style={{ color: "#0a5c5f" }}>All product List</h1>
                        <div className='d-flex flex-wrap category'>
                        {products?.map((product) => {
              return <Link key={product.id} to={`/dashboard/admin/product/${product.slug}`} style={{textDecoration:'none'}}>
                <div className="card m-2"  style={{ width: '18rem' ,backgroundColor:"white"}} >
                <img style={{alignSelf:'center'}} src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${product._id}`} className="card-img-top" alt={product.name} />
                <div className="card-body" style={{backgroundColor:"#c5fcfc"}}>
                  <div className='card-name-price'>
                    <h6 className="card-title">{product.name}</h6>
                    <h6 className="card-title card-price">{`Rs ${product.price}`}</h6>
                  </div>
                  <p className="card-text">{product.description.substring(0, 30)}</p>
                  
                </div>
              </div>
              </Link>
            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products