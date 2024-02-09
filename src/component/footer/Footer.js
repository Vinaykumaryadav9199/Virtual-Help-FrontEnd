import React from 'react'
import './Footer.css'
import locationIcon from '../image/locatio-icon.svg'
import phoneIcon  from '../image/phone-icon.svg'
import messageIcon from '../image/message-icon.svg'

const Footer = () => {
  return (
   <>
    <div className='flex flex-col  bg-gradient-to-t from-indigo-300 lg:flex-row lg:pb-10 lg:justify-around '>
        <div className='flex flex-col mx-5 mt-10 lg:w-1/3'>

              <h2 className='text-4xl font-serif text-center mb-5 font-medium  overflow-hidden tracking-wide drop-shadow-md'>Address</h2>
              <div className='flex'>
                  <img src={locationIcon}  alt=''className='h-10  mr-3'/> <p className=' text-xl font-serif font-normal'>Central Uiversity Of Haryana Mahendragarh 123029</p>
              </div>
              <div className='flex mt-5'>
                  <img src={phoneIcon} alt='' className='h-6 mr-3' /> <p className='text-xl font-serif font-normal'>+91 9199919991</p>
              </div>
              <div className=' flex mt-5'>
                  <img src={messageIcon} alt='' className='h-7 mr-3 ' /> <p className='text-xl font-serif font-normal'>virtualhelp62@gmail.com</p>
              </div>
        </div>
        <div className='flex flex-col justify-center items-center  lg:w-1/3'>
          <h2 className='text-4xl font-serif text-center mb-5 font-medium  overflow-hidden tracking-wide drop-shadow-md mt-6'>Menu</h2>
          <a href='/' className=' text-xl hover:text-rose-500 ' >Home&rarr;</a>
        
          <a href='/Notes' className='text-xl hover:text-rose-500 ' >Notes&rarr;</a>
     
          <a href='/PYQ-paper' className=' text-xl   hover:text-rose-500'>PYQ-papper&rarr;</a>
          <a href='/Blogs' className='text-xl  hover:text-rose-500'>Blogs&rarr;</a>
          <a href='/Contact-us ' className='text-xl  hover:text-rose-500'>Contact-us&rarr;</a>
          <a href='/Login ' className='text-xl  hover:text-rose-500'>Login&rarr;</a>


        </div>
        <div className=' lg:w-1/3 '>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.250764216389!2d76.13108807386502!3d28.35126729680057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39129577ce587a0b%3A0xbdc1de187d4dccf9!2sCentral%20University%20of%20Haryana!5e0!3m2!1sen!2sin!4v1700377690702!5m2!1sen!2sin"  title='cuhMAP' referrerpolicy="no-referrer-when-downgrade" className='mt-10  w-full lg:h-60'></iframe>
        </div>

    </div>

   </>
  )
}

export default Footer