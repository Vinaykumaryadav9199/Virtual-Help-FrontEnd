import React, { useState } from 'react'
import SignUpimg from "../image/SignUpimg.svg"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const Signup = () => {

    const navigate = useNavigate()
    const [SignupFormData, setSignupFormData] = useState({})
    const [Show, setShow] = useState(false)
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const handelChange = (e) => {
        const { name, value } = e.target;
        setSignupFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    }

    const handelOTP = (e) => {
        e.preventDefault();
        setButtonDisabled(true);

        // Enable the button after 30 seconds
        setTimeout(() => {
          setButtonDisabled(false);
        }, 30000);

        if (SignupFormData.Password !== SignupFormData.ConfirmPassword) {
            // alert("Password Does not match with confirm Password")
            toast.info("Password Does not match with confirm Password")
            return
        }
        axios.post("http://localhost:8000/sendOtp", SignupFormData).then((res) => {
            if (res.data.code === 422) {
                // alert("user Already register ")
                toast.info("user Already register")
            }
            else if (res.data.code === 200) {
                // alert("OTP sended")
                toast.success("OTP Sended")
                setShow(true)
            }
            else {
                // alert("Something Error ")
                toast.error("Something Error")
            }
        })



    }

    const handelSignup = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/Signup", SignupFormData).then((res) => {
            if (res.data.code === 200) {
                // alert(res.data.message);
                setTimeout(() => {
                    toast.success(res.data.message);
                  }, 2);
                navigate("/Login")
            }
            else {
                // alert(res.data.message)
                toast.info(res.data.message)
            }
        })

    }


    return (
        <div className=' flex w-screen h-fit flex-col justify-center items-center lg:flex-row'>

            <div className=' h-fit  w-screen  flex flex-col justify-center items-center  bg-gradient-to-b from-indigo-400 lg:h-[100vh]  lg:w-1/2'>
                <p className="text-4xl h-20 font-bold text-center mx-5 overflow-hidden  ">Create  your account</p>
                <form className='  w-full flex flex-col justify-center items-center h-fit' >
                    <div className='flex flex-col overflow-hidden'>
                        <div className=' overflow-hidden'>
                            <label className='text-xl font-bold m-1 text-zinc-900  '>Name:</label>
                            <br />
                            <input onChange={handelChange} className='h-10 outline-none  pl-4 rounded-md  mb-2  w-72 bg-gray-200' name='Name' placeholder='Enter Your Name' value={SignupFormData.Name} />
                        </div>
                        <div className=' overflow-hidden'>
                            <label className='text-xl font-bold m-1 text-zinc-900 '>Email:</label>
                            <br />
                            <input onChange={handelChange} className='h-10 outline-none pl-4 rounded-md   w-72 mb-2 bg-gray-200' name='Email' type='email' placeholder='Enter your Email ID' value={SignupFormData.Email} />
                        </div>
                    </div>
                    <div className='flex flex-col '>
                        <div className=' overflow-hidden'>
                            <label className='text-xl font-bold m-1 text-zinc-900 '>Password:</label>
                            <br />
                            <input onChange={handelChange} className='h-10 outline-none pl-4 rounded-md  mb-2 bg-gray-200 w-72' name='Password' type='password' placeholder='Enter Password' value={SignupFormData.Password} />
                        </div>
                        <div className=' overflow-hidden'>
                            <label className='text-xl font-bold m-1 text-zinc-900 '>ConfirmPassword:</label>
                            <br />

                            <input onChange={handelChange} className='h-10 outline-none pl-4 rounded-md  mb-2 bg-gray-200 w-72' name='ConfirmPassword' type='password' placeholder='Enter Confirm Password' value={SignupFormData.ConfirmPassword} />
                        </div>



                    </div>

                    <button className="text-white w-1/3 mx-auto bg-emerald-900
                     hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-3  mb-1 mt-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800  overflow-hidden" type='sumbit' onClick={handelOTP} disabled ={isButtonDisabled}>Send OTP</button>

                    {Show && <input onChange={handelChange} className='h-10 w-1/3 mx-auto mt-3 outline-none pl-4 rounded-md  mb-2 bg-gray-200' name='OTP' type='otp' placeholder='Enter OTP' value={SignupFormData.OTP} />}

                    {Show && <button className="text-white w-1/3  mx-auto  bg-green-500 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-1 py-3  mb-1 mt-3   focus:outline-none dark:focus:ring-blue-800  overflow-hidden" type='sumbit' onClick={handelSignup}>SIGN UP</button>
                    }


                </form>


                <Link to='/Login' className='mt-3 overflow-hidden'> Already Register<span className='m-3 text-violet-800' >Sign in</span> </Link>

            </div>
            <div className='w-screen h-fit  bg-gradient-to-t from-indigo-400 lg:w-1/2 lg:h-[100vh] lg:bg-gradient-to-b ' >
                <img className=" w-screen h-fit ml-10 lg:mt-24 lg:p-16" src={SignUpimg} alt=''></img>
            </div>

                <ToastContainer/>

        </div>
    )
}
export default Signup