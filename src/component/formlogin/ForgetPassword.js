import React, { useState } from 'react'
import ForgetPasswordimg from'../image/ForgetPasswordimg.svg'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ForgetPassword = () => {

    const [RestPasswordFormData , setRestPasswordFormData] = useState({})
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const handelchange = (e)=> {
        const { name, value } = e.target;
        setRestPasswordFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handelOTP =( e)=>{
        e.preventDefault()
        setButtonDisabled(true);

        // Enable the button after 30 seconds
        setTimeout(() => {
          setButtonDisabled(false);
        }, 30000); 

        axios.post("http://localhost:8000/forgetPasswordOtp" ,RestPasswordFormData).then((res)=>{
            // alert(res.data.message)
            toast.info(res.data.message)
        })
    }

    const handelRestPassword =(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/resetPassword",RestPasswordFormData).then((res)=>
        {
            // alert(res.data.message);
            toast.info(res.data.message)

        })
        .catch(()=>
        {
            // alert("not found"); 
            toast.info("User Not Found")
            
        })

    }

  


  return (
        <div className='flex  flex-col bg-gradient-to-b from-indigo-400 lg:flex-row lg:w-screen lg:h-fit'>
            <div className='flex justify-center items-center flex-col mt-6 lg:w-[45%] lg:h-full'>
            <p className="text-2xl font-bold text-center  m-5">Reset Your Password</p>
                <form className='flex flex-col  '>
                    <label className='text-xl font-bold m-1'>Email:</label>

                    <input onChange={handelchange} className= "h-10 outline-none  pl-3 border-2 border-salt-100 rounded-md w-72" type='email' placeholder='Enter your Email ID' name='Email' value={RestPasswordFormData.Email}/>

                    <button className="text-white   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  py-2.5 me-2 mb-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type='sumbit' disabled={isButtonDisabled} onClick={handelOTP}>Send OTP</button>

                    <label className='text-xl font-bold m-1'>OTP:</label>

                    <input onChange={handelchange} className= "h-10 outline-none pl-3 border-2 border-salt-100 rounded-md"  type='text' placeholder='Enter OTP' name='OTP' value={RestPasswordFormData.OTP}/>

                    <label className='text-xl font-bold m-1'>New Password:</label>
 
                    <input onChange={handelchange}  className= "h-10  outline-none pl-3 border-2 border-salt-100 rounded-md "  type='text' placeholder='Enter New Password' name='NewPassword' value={RestPasswordFormData.NewPassword}/>

                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"type='sumbit' onClick={handelRestPassword}>Reset Password</button>

                </form>
                <Link to='/Login'> Already Register <span className='text-violet-800'>Sign in</span></Link>

            </div>
            
            <div className=' w-screen h-fit mt-16 lg:w-[45%]'>
                <img src={ForgetPasswordimg} alt='' className='lg:p-10'/>
            </div>

            <ToastContainer/>


        </div>
    
  )
}

export default ForgetPassword