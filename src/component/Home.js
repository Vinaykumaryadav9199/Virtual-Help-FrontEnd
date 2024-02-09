import React from 'react'
import motoimg from "./image/moto.svg"
import notesImage from './image/notes.svg'
import examImage from './image/exam.svg'
import BlogImage1 from './image/Blog2.svg'
import OurTeam from './ourTeam/OurTeam'
import ContactUs from './contactUs/ContactUs'
import Footer from './footer/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./home3.css";
const Home = () => {
  return (
    <div className='m-0 p-0'>
        <div class="bubbles">
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
    </div>

      
      {/*------------------------------Hero  Section -------------------------------------------*/}
      <div className='flex flex-wrap w-screen h-fit flex-col justify-center items-center  bg-gradient-to-b from-indigo-300  lg:flex-row  lg:h-[100vh]  ' >

        <div className=' px-5 w-screen h-[50%] mt-10 flex flex-col items-center lg:w-2/5 lg:h-screen lg:mx-0 lg:justify-center lg:mt-0 lg:mr-12 '>
          <h1 className=' text-3xl font-medium  font-serif leading-10 tracking-wider lg:text-4xl overflow-hidden'>For every student </h1>
          <h1 className=' text-3xl font-medium  font-serif leading-10  tracking-wide lg:text-4xl overflow-hidden'>Free Virtual help </h1>
          <p className=' text-xl  font-medium text-center px-7 mt-4'>We are here for help in your College Study !</p>
          <span className=' text-lg text-justify mt-5 mx-5 text-gray-700 italic'> We provided top-rated study notes for various courses sessional and end semester privious year examination paper </span>
          {/* <a href='#notes' className=' mt-5'><button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br     focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2  text-xl">Explore</button>   </a> */}
        </div>
        <div className=' w-screen h-[45%]  flex justify-center items-center  flex-shrink-0 lg:w-2/5  lg:h-screen lg:mx-0 lg:mt-0'>
          <img src={motoimg} className='h-full w-full mr-5' alt='not avialble' />
        </div>


      </div>
      { /* ------------------------ Notes Section Started-------------*/}
      <div className=' flex flex-col-reverse flex-wrap w-screen h-fit  bg-gradient-to-t from-indigo-300 lg:flex-row lg:w-screen lg:h-[70vh]'>
        <div className=' flex h-[50vh]  w-screen justify-center items-center mx-5  lg:w-1/2 lg:h-[88%]'>
          <img src={notesImage} className=' p-7 md:p-10 lg:h-full lg:w-full lg:p-14' alt='' />
        </div>
        <div className='flex h-fit w-screen px-5 justify-center flex-col items-center  lg:w-2/5 lg:h-[88%] lg:p-0'>
          <h1 className=' text-3xl mt-10 overflow-hidden font-sans font-medium lg:text-4xl lg:overflow-hidden '>Notes</h1>
          <p className=' text-lg text-justify mt-5 mx-5 text-gray-700 lg:text-xl italic'> We provided hand written top-rated class  Notes for various courses and various competative exam related Notes </p>
          <a href='/Notes' className='my-5'> <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg  px-8 py-3 text-xl  text-center me-2 mb-2">Notes</button></a>
        </div>

      </div>


      {/*-----------------------PYQ -paper----------------------------------*/}

      <div className='flex h-fit w-screen flex-col  flex-wrap bg-gradient-to-t from-indigo-300 lg:flex-row lg:w-screen lg:h-[70vh] lg:m-0   lg:bg-gradient-to-b '>
        <div className='flex  h-fit w-screen px-5 justify-center flex-col items-center m-5 lg:w-[46%] lg:h-[88%] '>
          <h1 className='text-3xl mt-10 font-sans font-medium lg:text-4xl overflow-hidden'>PYQ-Paper</h1>
          <p className=' text-lg text-justify mt-5 mx-5 text-gray-700 lg:text-xl italic'>We provide sessional and End semester privious<br /> year examination paper for various courses</p>
          <a href='/PYQ-pape' className='my-5'> <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br     focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg  px-8 py-3 text-center me-2 mb-2 text-xl'>PYQ</button></a>
        </div>
        <div className=' flex h-[50vh] justify-center items-center  flex-shrink-0 lg:46% lg:h-[88%] lg:m-0'>
          <img src={examImage} alt='' className='  w-full lg:h-full lg:w-full lg:p-8' />
        </div>

      </div>


      {/* --------------------Blog Section -------------*/}

      <div className='flex flex-col-reverse flex-wrap  bg-gradient-to-t from-indigo-300 lg:flex-row lg:w-screen lg:h-[80vh] lg:m-0  '>
        <div className='flex justify-center items-center mx-5 flex-shrink-0  lg:w-[46%] lg:h-[88%] lg:m-0 '>
          <img src={BlogImage1} className='lg:h-full lg:w-full lg:p-7' alt='' />
        </div>
        <div className='flex justify-center flex-col items-center m-5 lg:w-[46%] lg:h-[88%]'>
          <p className='text-3xl mt-10 font-sans  overflow-hidden font-medium lg:text-3xl'>Blogs</p>
          <p className='text-lg text-justify mt-5 mx-5 text-gray-700 italic'>we provide pass-out students experience. The Blog filled with information about scholarships, hostel related information , and placement ideas</p>
          <a href='/blog' className='my-5'> <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br     focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2 text-xl' >Blogs</button></a>
        </div>

      </div>


      <ContactUs />
      <Footer />


    <ToastContainer/>

    </div>
  )
}

export default Home