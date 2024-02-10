import React from "react";
import Navbar from "./Component/Navbar";
import Last from "./Component/Last";
import Signup from "./Component/Signup";

import { Routes, Route } from "react-router-dom";
import PrivateComponent from "./Component/PrivateComponent";
import Login from "./Component/Login";
import AddProduct from "./Component/AddProduct";
import ProductList from "./Component/ProductList";
import UpdateProduct from "./Component/UpdateProduct";
const App = () => {
  
  return (
    <>
      <Navbar />
      <Routes>
      
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/logout" element={<h1>logout</h1>} />
          <Route path="/profile" element={<h1>profile</h1>} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Last />
    </>
  );
};

export default App;
