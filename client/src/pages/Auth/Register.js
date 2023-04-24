import { React, useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import '../../styles/AuthStyle.css'
const Register = () => {
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate()
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = Fname + Lname;
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, address, phone })
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }
  return (
    <Layout title="Register -BuyFresh">
      <div className='form-container'>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="title" style={{textAlign:'center'}}>
          <h1>Sign Up</h1>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputFName" className="form-label">First Name :</label>
            <input type="text" required onChange={(event) => {
              setFname(event.target.value);
            }} value={Fname} className="form-control" id="inputEmail4" placeholder="First Name" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputLName" className="form-label">Last Name :</label>
            <input type="text" onChange={(event) => {
              setLname(event.target.value);
            }} value={Lname} required className="form-control" id="inputPassword4" placeholder="Last Name" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">Email :</label>
            <input type="email" onChange={(event) => {
              setEmail(event.target.value);
            }} value={email} required className="form-control" id="inputEmail4" placeholder="User@gmail.com" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">Password :</label>
            <input type="password" onChange={(event) => {
              setPassword(event.target.value);
            }} value={password} required className="form-control" id="inputPassword4" placeholder="Password" />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">Address :</label>
            <input type="text" onChange={(event) => {
              setAddress(event.target.value);
            }} value={address} required className="form-control" id="inputAddress" placeholder="Address" />
          </div>
          <div className="col-12">
            <label htmlFor="inputPhoneNo" className="form-label">Phone No :</label>
            <input type="tel" onChange={(event) => {
              setPhone(event.target.value);
            }} value={phone} required className="form-control" id="inputAddress2" placeholder="+91" />
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
          <div className="col-12" style={{textAlign:'center'}}>
            <button type="submit" style={{padding:'8px',width:'15%',fontSize:"18px"}} className="btn btn-primary">Sign in</button>
          </div>
        </form>

      </div>
    </Layout>
  )
}

export default Register
