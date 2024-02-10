import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import data from './Details.json'
import axios from 'axios';
import storage from '../Firebase'
// import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import pdfcard from './image/pdfCard1.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL 
} from "firebase/storage";
import { useNavigate } from 'react-router-dom';


const App = () => {
    const navigate = useNavigate(); 
    const [pop ,setpop] =useState(false)
    const[Program, setProgram] =useState("Select Your Program");
    
    const [course , setCourse] = useState("Select Your Course");
    const [Sem , setSem]= useState("Select Your Semester");
    const [Subject ,setSubject] = useState("Select Your Subject");
    const [Upldbtn ,setUpldbtn] = useState(false)
    const [percent , setPercent] = useState(0);
    const [File ,setFile] =useState('');
    //const[Pdflink , setPdflink]= useState('')
    
    const [getNotes ,setgetNotes] = useState([]);
    const [isLogin, setisLogin] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
   


    useEffect(()=>{
      AOS.init({ offset: 20,});
      axios.get("https://virtual-help-backend.vercel.app/getNotes").then((data)=>{
        setgetNotes(data.data)
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

    },[])

    
    const Department = data;

    const handelsumbit = async(e)=>{
      e.preventDefault();
      setButtonDisabled(true);

      // Enable the button after 30 seconds
      setTimeout(() => {
        setButtonDisabled(false);
      }, 30000);

    if (!File) {
      //alert("Please choose a file first!")
      toast.info("Please choose a file first!")
      return
      }

const storageRef = ref(storage, `/files/${Subject} +${Date.now()}`)
const uploadTask =  uploadBytesResumable(storageRef, File);
  uploadTask.on(
"state_changed",
(snapshot) => {
    const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );

    // update progress
   
    setPercent(percent);
},
    (err) => console.log(err),
    () => {
    // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
   
          //setPdflink(url);
          const notes = {
            Program:Program,
            Course:course,
            Semester:Sem,
            Subject:Subject,
            Pdflink:url
          }
          
          
      axios.post("https://virtual-help-backend.vercel.app/notes/upload",notes).then((res)=>
      {
        console.log(res);
        alert(res.data.message)
        toast.success(res.data.message)
        setPercent("")
      }).catch((err)=>{
         console.log(err);
        toast.error(err)
      })   

     
      
    });

}
);

    }

    const handleReset =(e)=>{
      e.target.reset();
    }

    const handleUploadNote = ()=>{

      // try{
      //   axios.get("http://localhost:8000/CheckLogin").then((res)=>{
      //     console.log(res)
      //   })
      // }
      // catch(Errer)
      // {

      // }
      if (isLogin)
      {
        setUpldbtn(true)
      }
      else
      {
        // alert("please login first");  
        setTimeout(() => {
          toast.info("please login first")
        }, 2);
        
        navigate('/Login');
      }
     
    }

    const SearchNotes = (e)=>{
      e.preventDefault();
      const Search  ={ Program:Program,
        Course:course,
        Semester:Sem,
        Subject:Subject}
        axios.post("https://virtual-help-backend.vercel.app/notes/search" , Search).then((data)=>{

        if (data.data.length !==0){
          
        setgetNotes (data.data)
        }else
        {
          // alert("Notes Not Available")
          toast.info("Not Available")
        }

        })
      
    }

  return (
    <>
    <div className='flex  flex-wrap  bg-violet-200    relative  '> 

          <div className='flex h-14 w-screen bg-emerald-50 items-center justify-center'>
            <button   className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2' onClick={()=>{setpop(false); window.location.reload();}}>Recent Notes</button>
            <button  onClick={()=>{ setpop(true); setUpldbtn(false) }} className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2'> Search Notes</button>
            <button onClick={()=>{ setpop(true) ;handleUploadNote() }} className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2'> Upload Notes</button>
          </div>
        
          <div className='h-fit grid grid-cols-1  lg:grid-cols-5  md:grid-cols-3 sm:grid-cols-3 bg-violet-300 pt-10  w-[100%] '>
              {
                getNotes.map((notes)=>{
                pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

                 
                  return(
                   
                    <div
                   
                    data-aos="zoom-in-up"
                    // data-aos-anchor-placement="center-bottom"
                
                  >
                    <div className=' flex flex-col flex-wrap h-[55vh] p-2  m-2  justify-evenly items-center bg-violet-100  shadow-md shadow-slate-3 rounded-lg'>
                      {/* <Document className=' w-52 h-52 m-3 overflow-hidden' file={notes.Pdflink}>
                       <Page pageNumber={1} className='w-40  h-40'/>
                      </Document> */}
                      <img src={pdfcard} alt='' className=' h-24 w-24'/>
                      <h3 className=' mx-5'> <span className=' font-semibold text-lg'> Subject:- </span> {notes.Subject}</h3>
                      <div className=' flex flex-row mt-4'>
                      <a href={notes.Pdflink} className=' outline-none'><button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Show</button></a>
                      <a href={notes.Pdflink} download={notes.Pdflink} className=' outline-none z-10'><button className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'>Download</button></a>
                      </div>
                    </div>
                    </div>
                    
                    
                 
                    )
                })
              }
          </div>
          </div>

          
          
         { pop &&<div className=' flex flex-col justify-center items-center absolute top-32  h-fit w-[100vw] lg:w-[40vw] lg:mx-auto lg:left-1/4  bg-sky-300 rounded-3xl mb-10 z-10'>
          <button onClick={()=>{setpop(false)}} className=' text-2xl font-bold absolute right-3 top-0 '>X</button>
           
           {/* <div className='mt-12  '>
           <button onClick={()=>{setUpldbtn(false)}} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search Notes</button>
           <button onClick={handleUploadNote} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload Notes</button>
           </div> */}
          
        <form  onSubmit={handleReset} className='flex flex-col m-0  w-[75%] h-[100%] mt-10 mb-5 ' >  
          <select className='h-10 rounded-md text-md  ' onChange={(e)=>{setProgram(e.target.value); setCourse("Select Your Course") ;setSem("Select Your Semester");setSubject("Select Your Subject") } }>
            
            {
             Object.keys(Department).map(
              data=>{
                return <option value={data}>{data}</option>
              }
             )
            }
            
          </select>
         
          <select  className='h-10 rounded-md text-md mt-4 ' onChange={(e) =>{setCourse(e.target.value); setSem("Select Your Semester");setSubject("Select Your Subject") }}>

            {
              Object.keys(Department[Program]).map(data=>{
                return <option value={data}>{data}</option>
              })
            } 

          </select>

       <select className='h-10 rounded-md text-md  mt-4 '  onChange={(e) =>{setSem(e.target.value);setSubject("Select Your Subject")}} >
            
            {
               Object.keys((Department[Program][course])).map(data=>{
                return <option value={data}>{data}</option>
              })
             
            }

          </select> 
          
          <select className='h-10 rounded-md text-md  mt-4 mb-4' onChange={(e)=>{setSubject(e.target.value)}} >
            
            {
               ((Department[Program][course][Sem])).map(data=>{
                return <option value={data} >{data}</option>
              })
             
            }

          </select>
          { 
            Upldbtn &&<input className =" h-10 m-1 outline-none"type='file' placeholder='select your file ' onChange={(e)=>setFile(e.target.files[0])}/>
         }
          {Upldbtn&& <progress className='h-5  mx-auto mb-4 rounded-md' id="file" value={percent} max="100"> {percent} </progress>}
          { Upldbtn&&<button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 " type='sumbit' onClick={handelsumbit} disabled={isButtonDisabled}>Upload</button>}
          {!Upldbtn &&<button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 " type='sumbit' onClick={SearchNotes}>Get Notes</button> }



        </form>
       
        
        </div>
}
        <ToastContainer/>
       
     
        </>
  )
}

export default App
