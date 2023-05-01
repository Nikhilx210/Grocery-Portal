import { useState,useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import axios from 'axios'
import Spinner from "../Spinner";
import AdminDashboard from "../../pages/Admin/AdminDashboard";
import Dashboard from "../../pages/user/Dashboard"
export default function AdminRoute(){
    const[ok,setOk]=useState(false);
    const [auth,setAuth]=useAuth();
    useEffect(()=>{
        const authCheck =async()=>{
            const res=await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`)
            if(res.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        }
        if(auth?.token){
            authCheck();
        }
    },[auth?.token])
    // [auth?.token]
    return ok?<Outlet /> :<Spinner/>
}