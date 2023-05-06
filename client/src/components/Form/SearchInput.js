import React from "react";
import { useSearch } from "../../context/search";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [Search, setSearch] = useSearch();
  const navigate=useNavigate();
  //handleSubmit
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try {
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${Search.keyword}`)
      setSearch({...Search,results:data});
      navigate('/search')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={Search.keyword}
          onChange={(e) => {
            setSearch({ ...Search, keyword: e.target.value });
          }}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchInput;
