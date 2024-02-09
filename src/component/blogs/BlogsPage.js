
import React, { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import axios from 'axios'
export const BlogsPage = () => {
  const [Data ,setData] = useState({})
  let {id } = useParams()
 
 useEffect( ()=>{
  const fetch =  async()=>{
 
  try{
   
    await axios.post("http://localhost:8000/BlogsPage",{id}).then((res)=>{
      
      setData(res.data)
      console.log(res.data)

    })
  }
  catch(Error)
  {
    console.log(Error)
  }

}
fetch()
 })

  return (
    <>
      <div>

        <div>
          
        
          {Data[0] && (
            <div className=' flex flex-col justify-center items-center mt-2'>
              <div className=' h-[50vh] w-[95vw] lg:w-[75vw] lg:h-[75vh]'>
              <img src={Data[0].BannerImg} className=' h-[100%] w-[100%] rounded-lg'/>
              </div>
              <div className=' m-2'> 
                <h2 className=' text-2xl font-bold'> {Data[0].Title}</h2>
              </div>

              <div className=' m-2'> <h3 className=' p-5 text-xl font-semibold'>{Data[0].Description} </h3></div>
              <div className=' mx-10'
               dangerouslySetInnerHTML={{__html: Data[0].BlogBody}}
              />
            
         </div>
          
          
          )}
        </div>
      </div>
   
    </>
  )
}

export default BlogsPage