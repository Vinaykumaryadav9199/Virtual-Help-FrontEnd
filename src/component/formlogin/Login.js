import React, { useEffect, useState } from 'react'
import Loginimg from '../image/Loginimg.svg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate()
  const [LoginFormData ,setLoginFormData] = useState({})


  useEffect(()=>{
    axios.get("https://virtual-help-backend.vercel.app/CheckLogin" ,{ withCredentials: true }).then((data) => {
      console.log(data.status)

      if (data.status == 200) {

      navigate('/')
       
      }
      
    }).catch((err) => {
     
     
    })
  } ,[])
  
  const handelChange = (e)=>{
    const {name ,value} = e.target;
    setLoginFormData((prevFormData) => ({ ...prevFormData, [name]: value }));


  }




  const handelSignin =(e)=>{
    e.preventDefault();
    axios.post("https://virtual-help-backend.vercel.app/Login" , LoginFormData , { withCredentials: true }).then((res)=>{
      if (res.data.code === 200)
      {
        // alert(res.data.message)
        // localStorage.setItem("token",res.data.token)
        // // console.log(localStorage.getItem("token"));
        setTimeout(() => {
          toast.success(" Login Success");
        }, 2);
        
        navigate("/")

      }
      else{
        toast.error(res.data.message);
        // alert(res.data.message)
      }
    })
    
  }

  






  return (
    <div className=' flex  w-screen flex-wrap h-fit flex-col-reverse bg-gradient-to-b from-indigo-300 lg:flex-row lg:h-screen lg:w-screen '>
        <div className='w-screen h-[60vh] lg:h-full lg:w-[45%] '  >
            <img  className= "w-full h-full lg:p-24 "src={Loginimg} alt=''></img>
        </div>
        <div className=' w-screen  h-[68vh] flex flex-col justify-center items-center   rounded-2xl mx-3 lg:h-full lg:w-[45%]'>
            <p className="text-4xl  h-20 font-bold text-center  overflow-hidden m-2  font-serif">Sign in to your account</p>
            <form className='flex flex-col justify-center  ' >
                
                <label className='text-xl font-bold m-1 text-zinc-900 '>Email:</label>
                <input onChange={handelChange} name='Email' className=  "h-10  rounded-md w-72 outline-none mb-1 pl-4 bg-gray-200" type='email'placeholder='Enter your Email ID' value={LoginFormData.Email} />
                <label className='text-xl font-bold m-1 text-zinc-800'>Password:</label>
                <input onChange={handelChange} name ='Password' className='h-10 outline-none pl-4 rounded-md w-72 mb-2 bg-gray-200' type='password' placeholder='Enter Your Password' value={LoginFormData.Password}/>
                <button className=" text-white w-1/3  mx-auto  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-3  mb-1 mt-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 " onClick={handelSignin} type='sumbit'>SIGN IN</button>

            </form>
            <Link to="/Signup" className='mt-1'><h2>Not Register ? <span className='text-violet-800'>Sign up </span></h2></Link>
            <Link to ='/ForgetPassword' className='text-violet-800 mt-1'> Forget Password</Link>

        </div>
      <ToastContainer/>

    </div>
  )
}

export default Login
