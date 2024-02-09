import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { pdfjs } from 'react-pdf';
import axios from 'axios';
import { useState } from 'react';
import data from './Details.json'
import storage from '../Firebase'
import pyqCard from './image/pyqCard.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL 
} from "firebase/storage";

const Exam = () => {
    
    const navigate = useNavigate(); 
    const Department = data;
    const[Program, setProgram] =useState("Select Your Program");
    const [course , setCourse] = useState("Select Your Course");
    const [Sem , setSem]= useState("Select Your Semester");
    const [Subject ,setSubject] = useState("Select Your Subject");
    const [Upldbtn ,setUpldbtn] = useState(false)
    const [percent , setPercent] = useState(0);
    const [ExamType ,setExamType] =useState("Select Exam Type")
    const [File ,setFile] =useState('');
    const[pop ,setpop] =useState(false)
    const [isLogin, setisLogin] = useState(false);
    const[pyq ,setpyq] = useState([])
  
  const currentYear = new Date().getFullYear();
  const startYear = 2020;
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  
  useEffect(()=>{
    AOS.init({ offset: 20,});
    axios.get("https://virtual-help-backend.vercel.app/getpyq").then((data)=>{
      setpyq(data.data)
    }).catch((err)=>{
      console.error(err);
    })

    axios.get("https://virtual-help-backend.vercel.app/CheckLogin" ,{ withCredentials: true,}).then((data)=>{
      if (data.status == 200)
      {
       setisLogin(true)
      }
      
  }).catch((err)=>{
   console.log(err)
  })

  },[setpyq])
  
  const handelUloadbtn = (e)=>{
    if(isLogin)
    {
      setpop(true)
      setUpldbtn(true)
    }
    else{
      // alert("please login first");  
      setTimeout(() => {
        toast.info("please login first")
      }, 2);
      navigate('/Login');
    }

  }
  
  const handelsumbit = async(e)=>{
    e.preventDefault();
  }

  const handelUplaod = async(e)=>{
    setButtonDisabled(true);

    // Enable the button after 30 seconds
    setTimeout(() => {
      setButtonDisabled(false);
    }, 30000);
    if(!File)
    {
      // alert("please Select file which you want to upload")
      toast.info("please Select file which you want to upload")
      return
    }

    const storageRef = ref(storage, `/PYQ/${Subject} +${Date.now()}`)
    const uploadTask =  uploadBytesResumable(storageRef, File);
    uploadTask.on("state_changed",
    (snapshot) => {
      const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
  
      // update progress
     
      setPercent(percent);
  },
    (err) => console.log(err),
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((url)=>{

        const pyqDetails = {
          Year:selectedYear,
          ExamType:ExamType,
          Program:Program,
          Course:course,
          Semester:Sem,
          Subject:Subject,
          Pdflink:url
        }
        axios.post("https://virtual-help-backend.vercel.app/pyqs/upload",pyqDetails).then((res)=>{
          
          // alert(res.data.message)
          toast.success(res.data.message)
          setPercent("")
         

        }).catch((err)=>{
          // alert(err)
          toast.error(err)
        })
        
        
      })
    }
  
  )
    
  }

  const handelSearch = (e)=>{
    e.preventDefault();

    const Search = {
      Year:selectedYear,
      ExamType:ExamType,
      Program:Program,
      Course:course,
      Semester:Sem,
      Subject:Subject
      
    }
    axios.post("https://virtual-help-backend.vercel.app/pyqs/search" , Search).then((data)=>{
      if (data.data.length !== 0){
      setpyq(data.data)
      }
      else{
        // alert("No PYQ Avialable")
        toast.info("Not Avialable ")
      }


    })

  }
  

  return (


    <div className=' relative'>
       <div className='flex h-14 w-screen bg-emerald-50 items-center justify-center'>
          <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 ' onClick={()=>{setpop(false) ; window.location.reload();}}>Recent PYQ </button>
          <button className= 'text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ' onClick={()=>{setpop(true) ;setUpldbtn(false)}}>Search PYQ </button>
          <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ' onClick={handelUloadbtn}>Upload PYQ</button>
       </div>
       <div className='h-fit grid grid-cols-1  lg:grid-cols-5  md:grid-cols-3 sm:grid-cols-3 w-screen  bg-violet-300 pt-10   pr-5 '>
              {
                pyq.map((data)=>{
                pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

                 
                  return(
                    
                    <div
                   
                    data-aos="zoom-in-up"
                    // data-aos-anchor-placement="center-bottom"
                
                  >
                    <div className=' flex flex-col flex-wrap h-[55vh] p-2  m-2  justify-evenly bg-violet-100  shadow-md shadow-slate-3 rounded-lg'>
                      {/* <Document className=' w-52 h-52 m-3 overflow-hidden' file={notes.Pdflink}>
                       <Page pageNumber={1} className='w-40  h-40'/>
                      </Document> */}
                      <img src={pyqCard} alt='' className=' h-24 w-24 mx-auto'/>
                      <h3 className=''> <span className=' font-semibold text-lg'> Subject:- </span> {data.Subject}</h3>
                      <h3 className=''> <span className=' font-semibold text-lg'>  ExamType:- </span> {data.ExamType}</h3>
                      <h3 className=''> <span className=' font-semibold text-lg'> Year:- </span> {data.Year}</h3>
                      <div className=' flex flex-row mt-4'>
                      <a href={data.Pdflink} className=' outline-none z-10'><button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Show</button></a>
                      <a href={data.Pdflink} download={data.Pdflink} className=' outline-none z-10'><button className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'>Download</button></a>
                      
                      </div>
                    </div>
                    </div>
                 
                    )
                })
              }
          </div>


  <div className='  h-screen w-screen absolute top-10'>

    { pop&&<div className='flex flex-col justify-center items-center  absolute lg:left-1/4 top-5 left-0  h-fit lg:w-1/2  
    w-[90%] mx-4 bg-sky-300 rounded-3xl mb-10 z-10 ' >
      <button onClick={()=>{setpop(false)}} className=' text-2xl font-bold absolute right-3 top-0 '>X</button>
      <form   onSubmit={handelsumbit} className='flex flex-col m-0  w-[75%] h-[100%] mt-10 mb-10  z-10' > 
      <div className='flex flex-row'>
       <label>Select Examination Year: </label>
      <select className='h-7 w-28 rounded-md text-md ml-5 outline-none' id="yearSelect" onChange={(e)=>{setSelectedYear(parseInt(e.target.value, 10))}} value={selectedYear}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      
      </select>
      </div>
      <select className='h-7 rounded-md text-md mt-4 outline-none' onChange={(e)=>{setExamType(e.target.value)}}>
          <option>Select Examination Type</option>
          <option>Sessional -I</option>
          <option>Sessional -II</option>
          <option>End Semester</option>
      </select>
       
          <select className='h-7 rounded-md text-md  mt-4 outline-none ' onChange={(e)=>{setProgram(e.target.value); setCourse("Select Your Course") ;setSem("Select Your Semester");setSubject("Select Your Subject") } }>
            
            {
             Object.keys(Department).map(
              data=>{
                return <option value={data}>{data}</option>
              }
             )
            }
            
          </select>
         
          <select  className='h-7 rounded-md text-md mt-4 outline-none ' onChange={(e) =>{setCourse(e.target.value); setSem("Select Your Semester");setSubject("Select Your Subject") }}>

            {
              Object.keys(Department[Program]).map(data=>{
                return <option value={data}>{data}</option>
              })
            } 

          </select>

       <select className='h-7 rounded-md text-md  mt-4 outline-none '  onChange={(e) =>{setSem(e.target.value);setSubject("Select Your Subject")}} >
            
            {
               Object.keys((Department[Program][course])).map(data=>{
                return <option value={data}>{data}</option>
              })
             
            }

          </select> 
          
          <select className='h-7 rounded-md text-md  mt-4 mb-4 outline-none' onChange={(e)=>{setSubject(e.target.value)}} >
            
            {
               ((Department[Program][course][Sem])).map(data=>{
                return <option value={data} >{data}</option>
              })
             
            }

          </select>
          
           { Upldbtn &&<input className =" h-10 m-1 outline-none"type='file' placeholder='select your file ' onChange={(e)=>setFile(e.target.files[0])}/>}
         
         { Upldbtn&& <progress className='h-5  mx-auto mb-4 rounded-md' id="file" value={percent} max="100"> {percent} </progress>}
          { Upldbtn&&<button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 " type='sumbit' onClick={handelUplaod} disabled ={isButtonDisabled}>Upload PYQ</button>}
          {!Upldbtn &&<button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 " type='sumbit' onClick={handelSearch}>Get PYQ</button> }


        </form>
      
    </div>
} 
    </div>
    <ToastContainer/>
    </div>
  )
}

export default Exam
