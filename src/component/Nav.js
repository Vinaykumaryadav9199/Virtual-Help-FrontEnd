import React, { useEffect } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Nav.css'


const Nav = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get("http://localhost:8000/CheckLogin" {}).then((data)=>{
      console.log(data.data)

    }).catch((err)=>
    {
      console.log(err)
    })
  },
  [])
  const onclick=()=>
  {
    localStorage.removeItem("token");
    navigate('/');
  }
  return (
    <div className='nav'>
        
        <div className='logo'>
            <Link to='/' className='Logo-Link'><img src='./' alt='' /></Link>
        </div>
        <div className='nav-menu'>
            
            <div className='nav-item'><Link    className='Link' to ='/'>Home </Link></div>
            <div className='nav-item'><Link   className='Link' to ="/Notes">Notes </Link></div>
           <div className='nav-item'> <Link to ='/PYQ-paper'  className='Link'>PYQ-paper </Link></div> 
            <div className='nav-item'><Link to ='/Blog'  className='Link'>Blogs </Link></div>
            <div className='nav-item'><Link to ='/Contact-us'  className='Link'>Contact us </Link></div>
           <div className='nav-item'>
            {

              !(localStorage.getItem("token") )? <Link to ='/Login' className='Link'><button className='login-btn'  > login</button> </Link>
              
              :<button className='login-btn' onClick={onclick}  > logout</button>
              
            }
            
            </div>
            
        </div>


    </div>
  )
}

export default Nav