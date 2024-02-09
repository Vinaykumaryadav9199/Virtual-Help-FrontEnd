import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import { Link, useNavigate, Navigate, redirect } from 'react-router-dom'
import profilepic from "./image/profile.jpeg"
import { MdOutlineStarPurple500 } from "react-icons/md";
import axios from 'axios';
import pyqCard from './image/pyqCard.svg'
import { pdfjs } from 'react-pdf';
import pdfcard from './image/pdfCard1.jpg'
import storage from '../Firebase';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteNotes = (ObjectId, filePath) => {


  //   // const storage = getStorage()
  //   // const fileUrl =filePath


  //   // // Create a reference to the file to delete
  //   // const fileRef = storage.refFromURL(fileUrl);

  //   // console.log("File in database before delete exists : "
  //   //   + fileRef.exists())

  //   // // Delete the file using the delete() method
  //   // fileRef.delete().then(function () {

  //   //   // File deleted successfully
  //   //   console.log("File Deleted")
  //   // }).catch(function (error) {
  //   //   // Some Error occurred
  //   // });

  //   // console.log("File in database after delete exists : "
  //   //   + fileRef.exists())


  axios.post("http://localhost:8000/deleteNotes", { ObjectId }).then((data) => {
    setTimeout(() => {
      toast.success(data.data.message)
    }, 1);
  }).catch((err) => {
    toast.error(err)

  })
  window.location.reload();

}

const DeletePyqs = (ObjectId, filePath) => {
  //   // const storage = getStorage();
  //   // const fileRef = ref(storage, filePath);
  //   // deleteObject(fileRef)
  //   //   .then(() => {
  //   //     console.log("File deleted successfully");
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error deleting file:", error);
  //   //   });
  //   // var storage = firebase.storage().ref();
  //   const storage = getStorage()


  //   const fileUrl =filePath


  //   // Create a reference to the file to delete
  //   const fileRef = storage.refFromURL(fileUrl);

  //   console.log("File in database before delete exists : "
  //     + fileRef.exists())

  //   // Delete the file using the delete() method
  //   fileRef.delete().then(function () {

  //     // File deleted successfully
  //     console.log("File Deleted")
  //   }).catch(function (error) {
  //     // Some Error occurred
  //   });

  //   console.log("File in database after delete exists : "
  //     + fileRef.exists())


  axios.post("http://localhost:8000/deletePyqs", { ObjectId }).then((data) => {
    setTimeout(() => {
      toast.success(data.data.message)
    }, 1);
  }).catch((err) => {
    toast.error(err)
  })

  window.location.reload();
}

const DeleteBlog = (ObjectId, filePath) => {
  // // const storage = getStorage();
  // // const fileRef = ref(storage, filePath);
  // // deleteObject(fileRef)
  // //   .then(() => {
  // //     console.log("File deleted successfully");
  // //   })
  // //   .catch((error) => {
  // //     console.error("Error deleting file:", error);
  // //   });
  // // var storage = firebase.storage().ref();
  // const storage = getStorage()

  // const fileUrl =filePath


  // // Create a reference to the file to delete
  // const fileRef = storage.refFromURL(fileUrl);

  // console.log("File in database before delete exists : "
  //   + fileRef.exists())

  // // Delete the file using the delete() method
  // fileRef.delete().then(function () {

  //   // File deleted successfully
  //   console.log("File Deleted")
  // }).catch(function (error) {
  //   // Some Error occurred
  // });

  // console.log("File in database after delete exists : "
  //   + fileRef.exists())

  axios.post("http://localhost:8000/deleteBlog", { ObjectId }).then((data) => {

    setTimeout(() => {
      toast.success(data.data.message)
    }, 1);
    
  }).catch((err) => {
    toast.error(err)
  })
  
  window.location.reload();

}








const Dashboard = () => {

  const [isLogin, setisLogin] = useState(false);
  const [User, setUser] = useState({});
  const [Blogs, setBlogs] = useState([])
  const [Pyqs, setPyqs] = useState([])
  const [Notes, setNotes] = useState([])
  const navigate = useNavigate()







  useEffect(() => {
    axios.get("http://localhost:8000/CheckLogin" ,{ withCredentials: true }).then((data) => {
      console.log(data.status)

      if (data.status == 200) {

        setisLogin(true)
        setUser(data.data.UserData)
       
      }
      else  {

          // navigate("/")
      
      }
    }).catch((err) => {
      // navigate("/")
     
    })

  
    


    axios.get("http://localhost:8000/allData", { withCredentials: true, }).then((data) => {
      setBlogs(data.data.Blogs);
      setPyqs(data.data.Pyqs)
      setNotes(data.data.Notes)


    }).catch((err) => {
      toast.error(err)
    })
  },
    []
  )

  const logoutHandel = () => {
    axios.get("http://localhost:8000/logout").then((data) => {
      toast.success("Logout Success")
    }).catch((err) => {
      toast.error(err)

    })

  }

  return (
    <div className="main-div1 flex lg:flex-row md:flex-col">
      {User && <div className="lg:w-[20%] profile-div1">
        <img src={profilepic} className='profic-pic1' alt='profile_pic' />
        <div className='div1'>
          <h1 className='username1'>Welcome {User.Name} </h1>
          
          <h3 className='usergamil1'>{User.Email}</h3>
          <h4 className='rating1'>4.5 <MdOutlineStarPurple500 /> rating</h4>
        </div>

        <div className='uploaded1'>
          <p className='uploaded-count'>Total {Notes.length} Notes</p>
          <p className='uploaded-count'>Total {Pyqs.length} Exam</p>
          <p className='uploaded-count'>Total {Blogs.length} blogs</p>
          <a href='/' className='my-5'> <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-blue-300     rounded-lg  px-4 py-2 text-md  text-center me-2 mb-2" onClick={logoutHandel}>Logout</button></a>
        </div>

        

      </div>}



      {/* Blogs start Here  */}
      <div className=' lg:w-[80%] lg:ml-[20%] md:mt-30  bg-violet-300  flex flex-col  '>
        <div><h2 className=' text-3xl font-bold  font-serif m-3'> Your Blogs</h2></div>
        
        {Blogs[0] && <div className='   h-fit grid grid-cols-1 lg:grid-cols-3 gap-1  bg-violet-300'>
          {Blogs.map((elem) => {

            return (



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
                  <button className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900' onClick={()=>{DeleteBlog(elem._id, elem.Pdflink)}}>Delete</button>

                  <Link to={`/BlogsPage/Newblog/${encodeURIComponent(elem._id)}`}>

                    <button className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' > <span className=''>Read More</span></button>
                  </Link>

                </div>

              </div>





            )
          })}
        </div>
        }

        <div><h2 className=' text-3xl font-bold  font-serif  m-3'>PYQ</h2></div>
        <div className='h-fit grid  lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1  bg-violet-300 pt-10   pr-5 '>
        
          {
            Pyqs.map((data) => {
              pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


              return (

                <div className=' flex flex-col  flex-wrap h-[55vh] p-2   m-2  justify-evenly bg-violet-100  shadow-md shadow-slate-3 rounded-lg'>
                  {/* <Document className=' w-52 h-52 m-3 overflow-hidden' file={notes.Pdflink}>
                       <Page pageNumber={1} className='w-40  h-40'/>
                      </Document> */}
                  <img src={pyqCard} alt='' className=' h-24 w-24 mx-auto' />
                  <h3 className=''> <span className=' font-semibold text-lg'> Subject:- </span> {data.Subject}</h3>
                  <h3 className=''> <span className=' font-semibold text-lg'>  ExamType:- </span> {data.ExamType}</h3>
                  <h3 className=''> <span className=' font-semibold text-lg'> Year:- </span> {data.Year}</h3>
                  <div className=' flex flex-row mt-4'>
                    <a href={data.Pdflink} className=' outline-none z-10'><button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Show</button></a>
                    <a className=' outline-none z-10'><button className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900' onClick={ ()=>{DeletePyqs(data._id, data.Pdflink)}}>Delete</button></a>

                  </div>
                </div>

              )
            })
          }
        </div>

        <div> <h2 className=' text-3xl font-bold  font-serif  m-3 '>Notes</h2></div>
        <div className='h-fit grid   lg:grid-cols-3  md:grid-cols-3 sm:grid-cols-3   bg-violet-300 pt-10  pr-5 '>
       
          {
            Notes.map((notes) => {
              pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
              console.log(notes._id)

              return (

                <div

                  data-aos="zoom-in-up"
                // data-aos-anchor-placement="center-bottom"

                >
                  <div className=' flex flex-col flex-wrap h-[55vh] p-2  m-2  justify-evenly items-center bg-violet-100  shadow-md shadow-slate-3 rounded-lg'>
                    {/* <Document className=' w-52 h-52 m-3 overflow-hidden' file={notes.Pdflink}>
                       <Page pageNumber={1} className='w-40  h-40'/>
                      </Document> */}
                    <img src={pdfcard} alt='' className=' h-24 w-24' />
                    <h3 className=' mx-5'> <span className=' font-semibold text-lg'> Subject:- </span> {notes.Subject}</h3>
                    <div className=' flex flex-row mt-4'>
                      <a href={notes.Pdflink} className=' outline-none'><button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Show</button></a>
                      <a className=' outline-none z-10'><button className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900' onClick={()=>{DeleteNotes(notes._id, notes.Pdflink)}}>Delete</button></a>
                    </div>
                  </div>
                </div>



              )
            })
          }
        </div>

      </div>



      <ToastContainer />



    </div>




  )

}



export default Dashboard