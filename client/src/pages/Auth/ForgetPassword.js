import { React, useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import axios, { Axios } from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'
import toast from 'react-hot-toast';
import '../../styles/AuthStyle.css'
import { Link } from 'react-router-dom'
import goog from '../../images/google.png'
import { useAuth } from '../../context/Auth.js';

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const [answer, setAnswer] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forget-password`, {email, answer,newPassword})
            if (res && res.data.success) {
                // toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Somthing went wrong");
        }
    }
  return (
    <Layout title="Forget Password -BuyFresh">
            <div className="form-cont">
                <form className="login" onSubmit={handleSubmit}>
                    <div className="socialIcons"><h2>Reset Password</h2></div>
                    <label>Email address:</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <label>New Password:</label>
                    <input
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                    />
                    <label>What is your Favourite Fruit :</label>
                    <input
                        type="text"
                        onChange={(e) => setAnswer(e.target.value)}
                        value={answer}
                    />
                    <div className="socialIcons "><button className="but" >Reset</button></div>
                </form>
            </div>
        </Layout>
  )
}

export default ForgetPassword
