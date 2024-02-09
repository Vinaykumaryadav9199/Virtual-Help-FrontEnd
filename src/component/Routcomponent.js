import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Home from './Home'
import Notes from './Notes'
import Login from './formlogin/Login'
import Signin from './formlogin/Signup'
import ForgetPassword from './formlogin/ForgetPassword'
import ShowBlogs from './blogs/ShowBlogs'
import Exam from './Exam'
import PostBlog from './blogs/PostBlog'
import BlogsPage from './blogs/BlogsPage'
import ContactUs from './contactUs/ContactUs'
import Dashboard from './Dashboard'

const Routcomponent = () => {
  return (
    <> 
        <Routes>
       
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/Notes' element={<Notes />}></Route>
          <Route exact path='/Login' element={<Login />}></Route>
          <Route exact path='/Signup' element={<Signin />}></Route>
          <Route exact path='/ForgetPassword' element={<ForgetPassword />}></Route>
          <Route exact path='/PYQ-Paper' element={<Exam />}></Route>
          <Route exact path='/PostBlog' element={<PostBlog />}></Route>
          <Route exact path='/Blog' element={<ShowBlogs />}></Route>
          <Route exact path='/BlogsPage/Newblog/:id' element={<BlogsPage />}></Route>
          <Route exact path='/Contact-us' element = {<ContactUs/>}></Route>
          <Route exact path='/dashboard' element = {<Dashboard/>}></Route>

        </Routes>

       
      
    </>

  )
}

export default Routcomponent