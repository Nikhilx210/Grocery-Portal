import { React, useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import axios, { Axios } from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast';
import '../../styles/AuthStyle.css'
import { Link } from 'react-router-dom'
import goog from '../../images/google.png'
import { useAuth } from '../../context/Auth.js';
import { Checkbox } from 'antd';
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[passtype,setPassType]=useState('password');
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [passwordType, setPasswordType] = useState("password");
    const googleAuth = async () => {
        window.open(
            `${process.env.REACT_APP_API}/api/v1/auth/google/callback`,
            "_self"
        );

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password })
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Somthing went wrong");
        }
    }
    const handlePassType =(val)=>{
        if(val){
            setPassType('text')
        }else{
            setPassType('password')
        }
    }
    return (
        <Layout title="Register -BuyFresh">
            <div className="form-cont">
                <form className="login" onSubmit={handleSubmit}>
                    <div className="socialIcons"><h2>Log In</h2></div>
                    <label>Email address:</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <label>Password:</label>
                    <input
                        type={`${passtype}`}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className='d-flex'>
                    <Checkbox onClick={(e)=>handlePassType(e.target.checked)}></Checkbox>
                    <label style={{marginBottom:'2px',marginLeft:'5px'}}>Show Password</label>
                    </div>
                    <div className='Forget' onClick={() => {
                        navigate('/forget-password')
                    }}><p>Forget Password ?</p></div>
                    <div className="socialIcons "><button className="but" >Log in</button></div>
                    <div className="socialIcons">
                        <p style={{ marginBottom: "2%" }}>----Or----</p>
                        <div>
                            <img src={goog} className="google" alt="Google" onClick={googleAuth} />
                        </div>
                    </div>
                    <div className="socialIcons"><Link className="blue-link" to="/register">Do not have a account ?</Link></div>
                </form>
            </div>
        </Layout>
    )
}

export default Login