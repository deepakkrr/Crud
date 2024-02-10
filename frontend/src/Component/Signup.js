import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const navigate=useNavigate();

  // iska kaam hai ki url me http://localhost:3000/signup daalke login form ko acces na krle
  useEffect(()=>{
    const auth=localStorage.getItem('user');
    if(auth)
    {
      navigate("/");
    }
  },[]);

  const collectData= async ()=>{
    console.log(name,email,password);
    let result= await fetch("http://localhost:5000/register",{
      method:'post',
      body:JSON.stringify({name,email,password}),
      headers:{
        'Content-Type':"application/json"
      },
    });
    result=await result.json();
    console.log(result);
    localStorage.setItem("user",JSON.stringify(result));
    if(result)
    {
      navigate("/");
    }
  }
  return (
    <>
      <div className="didi">
        <h2>Register</h2>
        <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
          className="input-box"
          type="text"
          placeholder="Enter Your Name"
        />
        <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
          className="input-box"
          type="text"
          placeholder="Enter Your Email"
        />
        <input
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
          className="input-box"
          type="password"
          placeholder="Enter Your password"
        />
        <button onClick={collectData} type="button" className="btn">Sign Up</button>
      </div>
    </>
  );
};

export default Signup;
