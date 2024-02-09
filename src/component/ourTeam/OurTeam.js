import React from 'react'

import vinayImg from '../image/Vinay.jpeg'
import rajlaxmiImg from '../image/Rajlaxmi.jpeg'

const OurTeam = () => {
  return (
    <>
    <div className='flex flex-col items-center  justify-center w-screen h-[65vh]  bg-indigo-200 '>
        <h2 className='mt-7 text-5xl font-serif font-medium  overflow-hidden'>Our Team</h2>
        
        <div className=' flex w-screen h-5/6   justify-center  items-center lg:h-[70%]  '>
            <div className='flex flex-col  w-[50vh]  items-center justify-center bg-indigo-100  rounded-2xl mr-2'>
                <img src={vinayImg} alt='' className=' w-5/6 h-1/2 rounded-xl shadow-md mt-4 lg:h-40 sm:h-40' />
                <h3 className=' text-xl font-serif font-medium'>Vinay Kumar</h3>
                <p className=' text-lg text-center mx-4 font-sans'>Central University Of Haryana</p>

            </div>
            <div className=' flex flex-col  w-[50vh]  items-center justify-center  bg-indigo-100 rounded-2xl ml-2 '>
                <img src={rajlaxmiImg} alt='' className='w-3/4 h-40 rounded-xl shadow-md  mt-6'/>
                <h3 className=' text-xl font-serif font-medium'>Rajlaxmi</h3>
                <p className=' text-lg text-center mx-4 font-sans'> Central University Of Haryana</p>

            </div>
            

        </div>
        
    </div>


    </>
  )
}

export default OurTeam