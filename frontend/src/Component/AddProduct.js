import React, { useRef, useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const formref=useRef(null);


  const handleinput = async () => {

    console.log(!name);//true if not filled false if filled
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    } 
      console.log(name, price, category, company);
      let userId = JSON.parse(localStorage.getItem("user"))._id;
      
      console.log(userId);
      //integrate api
      let result = await fetch("http://localhost:5000/add", {
        method: "post",
        body: JSON.stringify({ name, price, category, userId, company }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if(error===false)
      {
        alert("Product has been Added Succesfully");
        
      }
      console.log(result);
    
  };
  return (
    <>
      <div className="product">
        <h1>AddProduct</h1>
        <form ref={formref}>
        <input
          className="input-box"
          type="text"
          value={name}
          placeholder="Enter Product Name"
          onChange={(e) => setName(e.target.value)}
        />
           {error && !name && (<span className="invalid-input">Enter valid Name</span>)}
        <input
          className="input-box"
          type="Number"
          value={price}
          placeholder="Enter Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && (<span className="invalid-input">Enter price</span>)}
        <input
          className="input-box"
          type="text"
          value={category}
          placeholder="Enter Category"
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && (<span className="invalid-input">Enter category</span>)}
        <input
          className="input-box"
          type="text"
          value={company}
          placeholder="Enter Company Name"
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && (<span className="invalid-input">Enter company Name</span>)}
        <button onClick={handleinput} className="btn">
          Add Product
        </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
