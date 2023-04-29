import React,{useState,useEffect} from 'react'
import { useNavigate ,useLocation} from 'react-router-dom'
const Spinner = () => {
    const[count,setCount]=useState(5);
    const navigate=useNavigate();
    const location=useLocation();
    useEffect(()=>{
        setTimeout(()=>{
            setCount(count-1)
        },1000)
        count === 0 && navigate('/login',{
            state: location.pathname
        })
    },[count])
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{height:'100vh'}}>
                <h2>Redirecting you in {count} </h2>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>

    )
}

export default Spinner
