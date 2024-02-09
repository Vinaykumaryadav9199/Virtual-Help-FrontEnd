
import axios from 'axios'
import React, { useEffect, useState, createContext, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Slider from 'react-slick';
import AOS from 'aos';
import 'aos/dist/aos.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import sld1 from '../image/sl1.png'
import sld2 from '../image/sl2.jpg'
import sld3 from '../image/sl3.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,   // Enable autoplay
  autoplaySpeed: 2000,  // Set the autoplay speed in milliseconds (e.g., 2000ms for 2 seconds)
};


const userBlog = createContext()
const ShowBlogs = () => {
  const [Blogs, setBlogs] = useState([]);
  const [isLogin, setisLogin] = useState(false);


  useEffect(() => {
    AOS.init({ offset: 20,});
    axios.get("https://virtual-help-backend-hvb7ihbum-vinay-kumar-yadavs-projects.vercel.app/showblogs").then((data) => {
      setBlogs(data.data);

    })
      .catch((err) => {
        console.log(err)
        console.log("hello Err")
      })

    axios.get("http://localhost:8000/CheckLogin", ).then((data) => {
      if (data.status == 200) {
        setisLogin(true)
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [])




  const navigate = useNavigate()

  const handleBlogPage = () => {

  }

  const handelCreatebtn = () => {

    if (isLogin) {
      navigate('/PostBlog')
    }
    else {
      // alert("please Login First")
      toast.info("please Login First")
    }

  }
  return (
    <>

      <div className='flex h-14 w-screen bg-emerald-50 items-center justify-center'>

        <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ' onClick={handelCreatebtn}>Create Blog</button>

      </div>

      <div className='h-[45vh] lg:h-[85vh]'>
        <Slider {...sliderSettings} className=' h-[99%] overflow-hidden'>
          <div className=' h-full relative   '>
            <img src={sld1} alt="Image 1" className='h-[43vh] w-[100vw] lg:h-[83vh]' />
            {/* <div className=' absolute  bottom-[10%] left-[40%] z-10 backdrop-blur-sm p-7 rounded-md text-center'>
        <p className=' font-sans text-3xl font-bold overflow-hidden tracking-wide '>Virtual Help</p>
        <p className=' font-sans text-2xl font-medium tracking-wide'>Welocome to our Blogs</p>
        </div> */}

          </div>
          <div className=' h-full  relative '>
            <img src={sld2} alt="Image 2" className=' h-[43vh] w-[100vw] lg:h-[83vh]' />
            {/* <div className=' absolute  bottom-[10%] left-[40%] z-10 backdrop-blur-sm p-7  rounded-md text-center'>
        <p className=' font-sans text-3xl font-bold overflow-hidden tracking-wide'>Virtual Help</p>
        <p className=' font-sans text-2xl font-medium tracking-wide'>Welocome to our Blogs</p>
        </div> */}
          </div>
          <div className=' h-full relative '>
            <img src={sld3} alt="Image 2" className='h-[43vh] w-[100vw] lg:h-[83vh]' />
            {/* <div className=' absolute  bottom-[10%] left-[40%] z-10 backdrop-blur-sm p-7 rounded-md text-center'>
        <p className=' font-sans text-3xl font-bold overflow-hidden tracking-wide'>Virtual Help</p>
        <p className=' font-sans text-2xl font-medium tracking-wide'>Welocome to our Blogs</p>
        </div> */}
          </div>
          {/* Add more slides as needed */}
        </Slider>


      </div>

      {Blogs[0] && <div className=' w-screen h-fit grid grid-cols-1 lg:grid-cols-3 gap-1  bg-violet-300'>
        {Blogs.map((elem) => {

          return (

            <div
                   
                    data-aos="zoom-in-up"
                    // data-aos-anchor-placement="center-bottom"
                
                  >

            <div className='flex flex-col h-[90vh] w-[94%] items-center justify-between p-3  shadow-sm shadow-gray-900   rounded-lg m-1   bg-violet-100 '>
              <div className='h-[33%] w-full  flex flex-shrink-0 '>
                <img src={elem.BannerImg} alt='Banner Image' className='w-full h-full' />
              </div>
              <div className='p-4'>
                <h2 className=' text-xl font-medium font-serif  '>{elem.Title}</h2>
              </div>
              <div>
                <p className=' text-base font-normal font-serif'>{elem.Description}</p>
              </div>
              <div className=' grid  grid-cols-2 '>
                <p className=' mr-5'> <span className=' text-base font-semibold '>Written By:</span>{elem.AuthorName}</p>

                <Link to={`/BlogsPage/Newblog/${encodeURIComponent(elem._id)}`}>

                  <button className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' > <span className=''>Read More</span></button>
                </Link>

              </div>

            </div>
            </div>
            





          )
        })}
        <ToastContainer/>
      </div>
      }


    </>

  )
}

export default ShowBlogs
export { userBlog };