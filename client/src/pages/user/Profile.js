import React, { useState, useEffect } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/Auth'
import { toast } from 'react-hot-toast'
import axios from 'axios'
const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = Fname + " " + Lname;
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-profile`, { name, email, address, phone })
      if(data?.error){
        toast.error(data?.error);
      }else{
        setAuth({...auth,user:data?.updateUser})
        let ls=localStorage.getItem("auth");
        ls=JSON.parse(ls);
        ls.user=data.updateUser
        localStorage.setItem("auth",JSON.stringify(ls));
        toast.success("Profile Updated Successfully")
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }
  //getUserData
  useEffect(() => {
    const { name, email, address, phone } = auth?.user;
    const n = name.split(" ");
    setFname(n[0]);
    setLname(n[1]);
    setAddress(address);
    setPhone(phone);
    setEmail(email);
  }, [auth?.user]);
  return (
    <Layout title="Dashboard - Profile">
      <div className='container-fluid m-4 p-4'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <div className='form-container' style={{ backgroundImage: "none" }}>
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="title" style={{ textAlign: 'center' }}>
                  <h1>User Profile</h1>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputFName" className="form-label">First Name :</label>
                  <input type="text"  onChange={(event) => {
                    setFname(event.target.value);
                  }} value={Fname} className="form-control" id="inputEmail4" placeholder="First Name" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputLName" className="form-label">Last Name :</label>
                  <input type="text" onChange={(event) => {
                    setLname(event.target.value);
                  }} value={Lname}  className="form-control" id="inputPassword4" placeholder="Last Name" />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputEmail4" className="form-label">Email :</label>
                  <input type="email" onChange={(event) => {
                    setEmail(event.target.value);
                  }} value={email}  className="form-control" id="inputEmail4" placeholder="User@gmail.com" disabled/>
                </div>
                {/* <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">Password :</label>
                  <input type="password" onChange={(event) => {
                    setPassword(event.target.value);
                  }} value={password} required className="form-control" id="inputPassword4" placeholder="Password" />
                </div> */}
                <div className="col-md-12">
                  <label htmlFor="inputPhoneNo" className="form-label">Phone No :</label>
                  <input type="tel" onChange={(event) => {
                    setPhone(event.target.value);
                  }} value={phone}  className="form-control" id="inputAddress2" placeholder="+91" />
                </div>
                {/* <div className="col-md-6">
                  <label htmlFor="inputQuestion" className="form-label">What is your Favourite Fruit :</label>
                  <input type="text" onChange={(event) => {
                    setAnswer(event.target.value);
                  }} value={answer} required className="form-control" id="inputQuestion" placeholder="Favourite Fruit" />
                </div> */}
                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">Address :</label>
                  <input type="text" onChange={(event) => {
                    setAddress(event.target.value);
                  }} value={address}  className="form-control" id="inputAddress" placeholder="Address" />
                </div>

                {/* <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">City</label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">State</label>
            <select id="inputState" className="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">Zip</label>
            <input type="text" className="form-control" id="inputZip" />
          </div> */}
                <div className="col-12" style={{ textAlign: 'center' }}>
                  <button type="submit" style={{ padding: '8px', width: '15%', fontSize: "18px" }} className="btn btn-primary">Update</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile