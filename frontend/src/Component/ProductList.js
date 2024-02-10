import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products").then((response) => {
      response.json().then((result) => {
        setProducts(result);
      });
    });
  },[]);

  const deleteProduct=async(id)=>{
    //  console.log(id);
    let result= await fetch(`http://localhost:5000/product/${id}`,{
      method:'delete'
    });
    result=await result.json();
    if(result)
    {
      alert("Record Deleted Suucessfully😃");
      setProducts(products.filter((product) => product._id !== id));
    }
      
  }
  const searchHandle= async (e)=>{
    console.log(e.target.value);
    let key=e.target.value;
    let result=await fetch(`http://localhost:5000/search/${key}`);
    result=await result.json();
    if(result)
    setProducts(result);
    
  }

  return (
    <>
      <div className="product-list">
        <h3>Products List</h3>
        <input type="text" onChange={searchHandle} className="search-box" placeholder="Search product"/>
        <ul>
          <li>S.no</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Company</li>
          {/* //oparation added for deletion */}
          <li>Operation</li>
        </ul>
        {
          products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            {/* //oparation added for deletion */}
            <li><button className="btn3" onClick={()=>deleteProduct(item._id)}>Delete</button>
            <Link to={`/update/${item._id}`}>Update</Link>
            </li>
          </ul>
        ))}
        
      </div>
    </>
  );
};

export default ProductList;
