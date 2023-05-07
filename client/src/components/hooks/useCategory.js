import { useState,useEffect } from "react";
import axios from "axios";

export default function useCategory(){
    const[Categories,setCategories]=useState([])

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
        }
      };
    useEffect(()=>{
        getAllCategory()
    },[])
    return Categories;
}