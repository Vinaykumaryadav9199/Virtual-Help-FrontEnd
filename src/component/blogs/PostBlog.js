
import { useState } from 'react';
import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';
import storage from '../../Firebase'
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.bubble.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-quill/dist/quill.snow.css';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import axios from 'axios';

axios.defaults.withCredentials = true
const tools = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
       
    ],
};


const PostBlog = () => {


    const Navigate = useNavigate()
    const [BlogBody, setBlogBody] = useState("");
    console.log(typeof BlogBody)
    const [file, setfile] = useState('')
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    

    const handelPostBlog = (e) => {
        e.preventDefault();
        setButtonDisabled(true);

        // Enable the button after 30 seconds
        setTimeout(() => {
          setButtonDisabled(false);
        }, 30000);
        if (!file) {
            // alert("Please choose Banner image  first!")
            toast.info("Please choose Banner image  first!")
            return
        }

        const storageRef = ref(storage, `/blogs/${Title} +${Date.now()}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {

                    const blogData = {
                        Title: Title,
                        BannerImg: url,
                        Description: Description,
                        BlogBody: BlogBody,
                    }
                    axios.post("http://localhost:8000/blogPost", blogData).then((res) => {
                        setTimeout(() => {
                            toast.success(res.data.message)
                        }, 1);
                       Navigate("/Blog")

                    }).catch((err) => {
                       toast.error("Somting Error")
                    })
                }
                )
            }
        )
    }
    return (
        <div className=' w-screen h-screen bg-indigo-300  '>
            <form  className=' flex flex-col items-center'>
                <div className=' flex flex-col  w-[100vw] items-center  text-left '>
                    <label className=' text-xl font-semibold my-4' >Enter the Title Of the Blog </label>

                <textarea type='textarea ' minLength={10} maxLength={30}  placeholder='Enter the Blog Title' onChange={(e) => { setTitle(e.target.value) }} className=' resize-none h-15 w-[70%] bg-slate-100 px-5 py-1 text-xl' />
                </div>
                <div className=' flex flex-col  w-[100vw] items-center  text-left'>
                    <label className='text-xl font-semibold  my-4'>Enter the Discription About Blog</label>
                <textarea type='text'  required="required" placeholder='Description' onChange={(e) => { setDescription(e.target.value) }}  className='resize-none  h-24 w-[70%] bg-slate-100 px-5 py-1 text-lg'/>
                </div>
                <div className=' flex flex-col  w-[100vw] items-center  text-left'>
                    <label className='text-xl font-semibold my-4'>Select Banner Image</label>
                <input type="file"  onChange={(e)=>{setfile(e.target.files[0])}} placeholder='Enter Blogs Banner here ' className=' h-16 mb-5' />
                </div>

                {/* <ReactQuill modules={modules} theme="snow" onChange={setBlogBody} placeholder="Content goes here..." /> */}
                <div className=' w-[98vw]'>
                <label className='text-xl font-semibold  mb-5'> Blog Content</label>
               
                <ReactQuill className=' w-full h-[85vh] mt-5 overflow-hidden bg-slate-200'  modules={tools}  theme='snow' onChange={setBlogBody} placeholder="Content goes here..." />
               
                </div>
                <div className=' flex flex-row  mt-5'>
                <button type='submit' className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mr-10' onClick={handelPostBlog} disabled ={isButtonDisabled}> Post Blog</button>
                {/* <button > preview</button> */}
                <button type='submit' className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={()=>{}}>Preview</button>
                </div>
                
            </form>

            {/* <div dangerouslySetInnerHTML={{ __html: BlogBody }} /> */}
            <ToastContainer/>
           
        </div>

        
       
    )
}

export default PostBlog






