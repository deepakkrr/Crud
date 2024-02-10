import React from "react";
import "../App.css"
import { Link,useNavigate } from "react-router-dom";
import logo from "../images/code.jpg"


const Navbar = () => {
  const navigate=useNavigate();
  const auth=localStorage.getItem('user');
  const handleLogout=()=>{
    localStorage.clear();
    // niche wala navigate wala kaam hum surety ke liye kiye
    navigate("/signup");
  }
  return (
    <>
      <div>
      {
        auth ? <ul className="nav-ul">
        <img className="logo" src={logo} alt="nhi hai"/>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add">Add product</Link></li>
          <li><Link to="/update/:id">Update product</Link></li>
          <li><Link to="/profile">profile</Link></li>
          <li><Link onClick={handleLogout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
          </ul>
          :
          <ul className="nav-ul nav-right">
          <li><Link to="/signup">SignUp</Link></li>
           <li><Link to="/login">Login</Link></li>
          </ul>
       
      }
      </div>
    </>
  );
};

export default Navbar;




{/* <li>{ auth ? <Link onClick={handleLogout} to="/signup">Logout</Link> : <Link to="/signup">SignUp</Link>}</li>
          <li><Link to="/login">Login</Link></li> */}
          // {
          //   auth ? <li><Link onClick={handleLogout} to="/signup">Logout</Link></li>:
          //   <>
          //   <li><Link to="/signup">SignUp</Link></li>
          //   <li><Link to="/login">Login</Link></li>
          //   </>
          // }