import React from 'react'
import { useSearch } from '../context/search'
import Layout from '../components/Layout/Layout';
const Search = () => {
    const[values,setValues]=useSearch();
  return (
    <Layout title={'Search Result'}>
      <div className='container'>
        <div className='text-center'>
            <h1>Search Result</h1>
            <h6>{values?.results.length <1 ? 'No Products Found' : `Found ${values?.results.length}`}</h6>
            <div className='d-flex flex-wrap' >
            {values?.results.map((product) => {
              return <div className="card m-2" key={product.id} style={{ width: '18rem' }} >
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${product._id}`} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description.substring(0,30)}</p>
                  <p className="card-text">{`Rs ${product.price}`}</p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-2">ADD To CART</button>
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
