import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom';
import AdminMenu from '../../components/Layout/AdminMenu'
const { Option } = Select
const UpdateProduct = () => {
    const [categories, setCategories] = useState([])
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')
    const [shipping, setShipping] = useState('')
    const [id, setId] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    //get Single Product

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setName(data.product.name);
            setDescription(data.product.description);
            setQuantity(data.product.quantity);
            setPrice(data.product.price);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);
            setId(data.product._id);
            console.log(category)

        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong in Retrieving Product");
        }
    }
    //get Single Product IMage

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            console.log(data);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong in Retrieving Category");
        }
    };
    useEffect(() => {
        getSingleProduct();
    }, [])
    useEffect(() => {
        getAllCategory();
    }, [])
    //Create Product Function
    const handleUpdate = async () => {
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            image && productData.append("image", image);
            productData.append("category", category);
            productData.append("shipping", shipping);
            const { data } = axios.post(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData);
            if (data?.success) {
                toast.error("Something Went Wrong ");

            } else {
                toast.success("Product Updated Successfully")
                navigate('/dashboard/admin/products')
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong in Creating Product");
        }
    }
    //Handle Delete
    const handleDelete = async () => {
        try {
            let answer=window.prompt("Are you Sure You want to delete this Product ?")
            console.log("Apurv"+answer)
            if(!answer){
                return
            }
            const { data } = axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`);
            if (data?.success) {
                toast.error("Something Went Wrong ");

            } else {
                toast.success("Product Deleted Successfully")
                navigate('/dashboard/admin/products')
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong in Deleting Product");
        }
    }
    return (
        <Layout title="Dashboard - Create Product">
            <div className='container-fluid m-4 p-4'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 '>
                        <h1>Update Product</h1>
                        <div className='m-1 w-75'>
                            <Select bordered={false} placeholder="Select a category"
                                size='large' showSearch
                                className='form-select mb-3' onChange={(value) => { setCategory(value) }} value={category}>
                                {categories?.map(c => (
                                    <Option value={c._id} key={c._id}>{c.name}</Option>
                                ))}
                            </Select>
                            <div className='mb-3 text-center' >
                                <label className='btn btn-outline-secondary col-md-6'>
                                    {image ? image.name : "Upload Image"}
                                    <input type="file" name='image' accept='image/*' onChange={(e) => {
                                        setImage(e.target.files[0])
                                    }} hidden></input>
                                </label>
                            </div>
                            <div className='mb-3'>
                                {image ? (<div className='text-center'>
                                    <img src={URL.createObjectURL(image)} alt='Product_Image' height={'200px'} className='img img-responsive'></img>
                                </div>) :
                                    (<div className='text-center'>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${id}`} alt='Product_Image' height={'200px'} className='img img-responsive'></img>
                                    </div>)
                                }
                            </div>
                            <div className='mb-3'>
                                <input type='text' placeholder='Enter Name' className='form-control' onChange={(e) => {
                                    setName(e.target.value);
                                }} value={name}></input>
                            </div>
                            <div className='mb-3'>
                                <textarea type='text' placeholder='Enter Description' className='form-control' onChange={(e) => {
                                    setDescription(e.target.value);
                                }} value={description}></textarea>
                            </div>
                            <div className='mb-3'>
                                <input type='number' placeholder='Enter Price' className='form-control' onChange={(e) => {
                                    setPrice(e.target.value);
                                }} value={price}></input>
                            </div>
                            <div className='mb-3'>
                                <input type='number' placeholder='Enter Quantity' className='form-control' onChange={(e) => {
                                    setQuantity(e.target.value);
                                }} value={quantity}></input>
                            </div>
                            <div className='mb-3'>
                                <Select bordered={false} placeholder="Select Shipping"
                                    size='large' showSearch
                                    className='form-select mb-3' onChange={(value) => { setShipping(value) }} value={shipping ? "Yes" : "No"}>
                                    <Option value={1}>Yes</Option>
                                    <Option value={0}>No</Option>
                                </Select>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-danger' onClick={handleDelete}>Delete Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct