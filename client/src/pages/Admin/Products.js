import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
                        <h1 className='text-center'>All product List</h1>
                        <div className='d-flex'>
                            {products.map((product) => {
                                return <Link to={`/dashboard/admin/product/${product.slug}`} key={product._id} className='product-link'>
                                    <div className="card m-2" style={{ width: '18rem' }} >
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${product._id}`} className="card-img-top" alt={product.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description}</p>
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