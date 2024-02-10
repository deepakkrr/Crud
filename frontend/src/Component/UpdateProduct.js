import React, { useEffect,  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
   const params=useParams();
   const navigate=useNavigate();

   useEffect(()=>{
    getProductDetails();
   },[]);

   const getProductDetails=async()=>{
        //isse id mil jayega
        console.log(params);
        let result=await fetch(`http://localhost:5000/product/${params.id}`);
        result=await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
   }


  const handleUpdate= async ()=>{
    console.log(name,price,category,company);
    let result=await fetch(`http://localhost:5000/product/${params.id}`,{
      method:"put",
      body:JSON.stringify({name,price,category,company}),
      headers: {
        "Content-Type": "application/json",
      },
    })
    result=await result.json();
    console.log(result);
    if(result)
    navigate("/");
  }

  return (
    <>
      <div className="product">
        <h1>Update Product</h1>
        
          <input
            className="input-box"
            type="text"
            value={name}
            placeholder="Enter Product Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="input-box"
            type="Number"
            value={price}
            placeholder="Enter Price"
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            className="input-box"
            type="text"
            value={category}
            placeholder="Enter Category"
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            className="input-box"
            type="text"
            value={company}
            placeholder="Enter Company Name"
            onChange={(e) => setCompany(e.target.value)}
          />
          <button onClick={handleUpdate} className="btn">Update Product</button>
          
      </div>
    </>
  );
};

export default UpdateProduct;
