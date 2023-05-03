import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from 'antd'
const CreateCategory = () => {
  const [ categories, setCategories ] = useState([]);
  const [name,setName]=useState('');
  const [visible,setVisible]=useState(false);
  const[selected,setSelected]=useState(null);
  const[updatedValue,setUpdatedValue]=useState("");
  //handle form
  const handleupdate =async (e)=>{
    e.preventDefault()
    try {
      const {data}= await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected}`,{name:updatedValue});
      if(data?.success){
        getAllCategory();
        toast.success(`Category has been Updated`)
        setVisible(false);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
       toast.error("Something Went Wrong")
    }
  }
  const handleSubmit =async (e)=>{
    e.preventDefault()
    try {
      const {data}= await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name});
      if(data?.success){
        getAllCategory();
        setSelected(null);
        setUpdatedValue("");
        toast.success(`${name} Category is Created`)
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
       toast.error("Something Went Wrong")
    }
  }
  const handleDelete =async ()=>{
    try {
      const {data}= await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${selected}`);
      if(data?.success){
        getAllCategory();
        setSelected(null);
        toast.success(`Category is Deleted`)
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
       toast.error("Something Went Wrong")
    }
  }
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
  useEffect(() => {
    console.log("hello")
    getAllCategory();
  },[])
  return (
    <Layout title="Dashboard - Create Category">
      <div className='container-fluid m-4 p-4'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Manage Category</h1>
            <div className='p-3 w-50'>
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((d) => {
                    return <tr key={d._id}>
                      <td>{d.name}</td>
                      <td><button className='btn btn-primary ms-2' onClick={()=>{setVisible(true);setSelected(d._id);setUpdatedValue(d.name)}}>Edit</button>
                      <button className='btn btn-danger ms-2' onClick={()=>{setSelected(d._id);handleDelete();}}>Delete</button>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
            <Modal open={visible} onCancel={()=>{setVisible(false)}} footer={null} visible={visible}>
              <div className='p-3'><CategoryForm value={updatedValue} setValue={setUpdatedValue} handleSubmit={handleupdate}/></div>
              
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory