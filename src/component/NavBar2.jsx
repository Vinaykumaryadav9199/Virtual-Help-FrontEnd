import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./NavBar2.css";
import {  NavLink ,Link ,useNavigate } from "react-router-dom";
import axios from "axios";


function NavBar2() {
  const [nav, setNav] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const navigate = useNavigate();

 
 

  useEffect(()=>{
   axios.get("http://localhost:8000/CheckLogin" ,{withCredentials:true} ).then((data)=>{
    console.log(data.status)
       if (data.status == 200)
       {
        
        setisLogin(true)
       }
   }).catch((err)=>{
    console.log(err)
   })
  } )

  const openNav = () => {
    setNav(!nav);
  };


  return (
    <div className="navbar-section ">
      <h1 className="navbar-title">
        <NavLink to="/#">
          Virtual Help
        </NavLink>
      </h1>

      <ul className="navbar-items">
        <li>
          <NavLink className="navbar-links" to="/">Home</NavLink>
        </li>

        <li>
          <NavLink className="navbar-links" to="/Notes">Notes</NavLink>
        </li>
        <li>
          <NavLink className="navbar-links" to="/PYQ-paper">PYQ-paper</NavLink>
        </li>

        <li>
          <NavLink className="navbar-links" to="/Blog">Blogs</NavLink>
        </li>
        <li>
          <NavLink className="navbar-links" to="/Contact-us">Contact-us</NavLink>
        </li>
        {/* <li>
          <NavLink to="/bookappointment#">  <button href="/bookappointment" className="navbar-btn"
            type="button"
            disabled={isButtonDisabled}
            // onClick={handleBtnClick}
          >BOOK APPOINTMENT</button> </NavLink>
        </li> */}

      <li>
              { !(isLogin)? <NavLink to="/Login"><button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-bold">Login</button></NavLink>
              :<NavLink  to="/dashboard"> <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-bold">Dashboard</button></NavLink>
              }
        </li>
      </ul>

      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <a onClick={openNav} href="/">
              Home
            </a>
          </li>
          <li>
            <a onClick={openNav} href="/Notes">
            Notes
            </a>
          </li>
          <li>
            <a onClick={openNav} href="/PYQ-paper">
            PYQ-paper
            </a>
          </li>

          <li>
            <a onClick={openNav} href="/Blog">
             Blogs
            </a>
          </li>


          <li>
            <a onClick={openNav} href="/Contact-us">
            Contact-us
            </a>
          </li>

          <li>
           {  !(isLogin)?<a onClick={openNav} href="/Login">
           <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold rounded-lg  px-10 py-2.5 text-center me-2 mb-2 text-xl">Login</button>
            </a>:<a onClick={openNav} href="/dashboard">
            <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold rounded-lg  px-10 py-2.5 text-center me-2 mb-2 text-xl">Dashboard</button>
            </a>

           }
          </li>
          

        </ul>
        {/* <li>
          <NavLink to="/bookappointment">  <button href="/bookappointment" className="mobile-navbar-btn"
            type="button"
            disabled={isButtonDisabled}
            // onClick={handleBtnClick} 
            onClick={openNav}
          >BOOK APPOINTMENT</button> </NavLink>
        </li> */}
      </div>

      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default NavBar2;