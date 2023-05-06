import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Checkbox,Radio } from 'antd';
import { prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const[price,setPrice]=useState([]);
  const[total,setTotal]=useState(0);
  const[page,setPage]=useState(1);
  const[loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false);
      console.log(data);
      if (data?.success) {
        setProducts(data?.product);
        console.log(products)
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something Went Wrong in Retrieving Products");
    }
  };
  useEffect(() => {
    if(!checked.length && !price.length){
      getAllProducts();
    }
  }, [checked,price])
  useEffect(() => {
    if(checked.length || price.length){
      getFilterProduct();
    }
    
  }, [checked,price])
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      console.log(data);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Retrieving Category");
    }
  };
  //get toatl count
  const getTotal = async ()=>{
    try {
      const {data} =await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, [])
  //load More
  const loadMore =async ()=>{
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setProducts({...products,...data.product});
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(()=>{
    if(page==1) return;
    loadMore();
  },[page])
  //handle Filter
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id);
    } else {
      console.log("Delete")
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }
  //getFilter Product
  const getFilterProduct=async ()=>{
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filter`,{checked,price})
      setProducts(data?.product);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Retrieving Filtered Product");
    }
  }
  return (
    <Layout title={"All Product - Best Offers"}>
      <div className='row mt-4'>
        <div className='col-md-3'>
          <h4 className='text-center'>Filter By Category</h4>
          <div className='d-flex flex-column '>
            {Categories?.map((category) => {
              return <Checkbox className='m-1' key={category._id} onChange={(e) => handleFilter(e.target.checked, category._id)}>{category.name}</Checkbox>
            })}
          </div>
          <h4 className='text-center'>Filter By Price</h4>
          <div className='d-flex flex-column '>
            <Radio.Group onChange={(e)=> setPrice(e.target.value)}>
            {prices?.map((p) => {
              return <div><Radio className='m-1' key={p._id} value={p.value}>{p.name}</Radio></div>
            })}
            </Radio.Group>
          </div>
          <div className='text-center'>
            <button className='btn btn-danger w-' onClick={()=> window.location.reload()} style={{width:'30%'}}>Reset Filter</button>
          </div>
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Products</h1>
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
          <div className='m-2 p-3'>
            {products && products.length<total && (
              <button className='btn btn-warning' onClick={
                (e)=>{
                  e.preventDefault();
                  setPage(page+1);

                }
              }>{loading ? "Loading ..." : "Load More"}</button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage