import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  //iska kaam hai ki url me http://localhost:3000/login daalke login form ko acces na krle
  useEffect(()=>{
    const auth=localStorage.getItem('user');
    if(auth)
    {
      navigate("/");
    }
  },[]);


  const handlelogin= async ()=>{
    console.log(email,password);
    let result=await fetch("http://localhost:5000/login",{
        method:"post",
        body:JSON.stringify({email,password}),
        headers:{
            'Content-Type':"application/json"
        }
    });
    result=await result.json();
    console.log(result);
    if(result.name)
    {
         localStorage.setItem("user",JSON.stringify(result));
         navigate("/");
    }
    else{
        alert("Please Enter Correct details");
    }
  }

  return (
    <>
      <div className="login">
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="input-box"
          value={email}
          type="text"
          placeholder="Enter Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="input-box"
          value={password}
          type="password"
          placeholder="Enter Password"
        />
        <button onClick={handlelogin} type="button" className="btn">
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
