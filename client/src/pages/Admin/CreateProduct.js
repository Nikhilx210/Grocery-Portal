import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom';
import AdminMenu from '../../components/Layout/AdminMenu'
const { Option } = Select
const CreateProduct = () => {
  const [categories, setCategories] = useState([])
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')
  const [shipping, setShipping] = useState('')
  const navigate = useNavigate();

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
    console.log("hello")
    getAllCategory();
  }, [])
  //Create Product Function
  const handleCreate = async () => {
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("image", image);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData);
      if (data?.success) {
        toast.error("Something Went Wrong ");

      } else {
        toast.success("Product Created Successfully")
        navigate('/dashboard/admin/products')
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Creating Product");
    }
  }
  return (
    <Layout title="Dashboard - Create Product">
      <div className='container-fluid m-4 p-4'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Create Product</h1>
            <div className='m-1 w-75'>
              <Select bordered={false} placeholder="Select a category"
                size='large' showSearch
                className='form-select mb-3' onChange={(value) => { setCategory(value) }}>
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
                {image && (<div className='text-center'>
                  <img src={URL.createObjectURL(image)} alt='Product_Image' height={'200px'} className='img img-responsive'></img>
                </div>)}
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
                  className='form-select mb-3' onChange={(value) => { setShipping(value) }}>
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>
              <div className='mb-3'>
                <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct