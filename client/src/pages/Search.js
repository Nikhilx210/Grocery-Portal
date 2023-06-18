import React from 'react'
import { useSearch } from '../context/search'
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';
import '../styles/CartProductStyle.css'
const Search = () => {
    const[values,setValues]=useSearch();
    const [cart, setCart] = useCart();
  const navigate = useNavigate();
  return (
    <Layout title={'Search Result'}>
      <div className='container category'>
        <div className='text-center'>
            <h1 style={{color: "#0a5c5f"}}> Search Result</h1>
            <h6 style={{color: "#0a5c5f"}}>{values?.results.length <1 ? 'No Products Found' : `Found ${values?.results.length}`}</h6>
            <div className='d-flex flex-wrap' >
            {values?.results.map((product) => {
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
      </div>
    </Layout>
  )
}

export default Search