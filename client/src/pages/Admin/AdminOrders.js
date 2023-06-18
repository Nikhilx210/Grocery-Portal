import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/Auth';
import axios from 'axios';
import moment from 'moment'
import {Select} from 'antd'
const {Option}=Select
const AdminOrders = () => {
  const [status, setStatus] = useState(["Not Processed", "Processing", "Shipped", "Delivered", "Cancel"])
  const [orders, setOrders] = useState([]);
  const [changeStatus, setchangeStatus] = useState('')
  const [auth, setAuth] = useAuth();
  //get all product
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [])
  const handleChange= async(orderId,value)=>{
    try {
      const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,{status:value})
      getOrders()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout title={'All orders Data'}>
      <div className='container-fluid m-4 p-4'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1 className='text-center' style={{color: "#0a5c5f"}}>All Orders</h1>
            {
              orders?.map((o, i) => {
                return (
                  <div className='border shadow'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>#</th>
                          <th scope='col'>Status</th>
                          <th scope='col'>Buyer</th>
                          <th scope='col'>Order Date</th>
                          <th scope='col'>Payment</th>
                          <th scope='col'>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <Select bordered={false} onChange={(value)=> handleChange(o._id,value)} defaultValue={o?.status}>
                              {status.map((s,i)=>{
                                return <Option key={i} value={s}>{s}</Option>
                              })}
                            </Select>
                          </td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='container'>
                      {o?.products?.map(p => {
                        return <div className="row card mb-2 p-3 flex-row">
                          <div className="col-md-2">
                            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${p._id}`} className="card-img-top" alt={p.name} height={200} width={200} />
                          </div>
                          <div className="col-md-4">
                            <p>Name : {p.name}</p>
                            <p>Description : {p?.description?.substring(0, 30)}</p>
                            <p>Price : ${p.price}</p>
                          </div>
                        </div>
                      })}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminOrders