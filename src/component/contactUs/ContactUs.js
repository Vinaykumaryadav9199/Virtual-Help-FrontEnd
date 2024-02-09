import React from 'react'

const ContactUs = () => {
  return (
    <div className=' flex flex-col  justify-center items-center bg-indigo-300 lg:flex-row lg:w-screen lg:h-[90vh]'>
        <div className=' flex flex-col items-center mt-5 lg:w-1/2 lg:h-[95%] lg:justify-center lg:items-center'>
            <h2 className=' text-5xl font-sans font-medium overflow-hidden  '>Contact Us.</h2>
              
            <p className='text-4xl mt-3 font-serif overflow-hidden'>We can help</p>

        </div>
        <div className=' flex lg:w-1/2 lg:h-full'>
            <form  action='https://formspree.io/f/xyyqabql' method='POST'name='form' className='flex flex-col justify-center mt-10 lg:mt-5 lg:w-2/3'>
                <label className='mb-2 block text-lg font-medium  text-gray-700'>User Name</label>
                <input type='text' placeholder='Name' name='Username' className='h-10  text-lg border-2 border-gray-200 rounded-md px-3 bg-gray-200 outline-none mb-1'/>
                <label className='mb-2 block text-lg font-medium text-gray-700 '> Email</label>
                <input type='email' placeholder='Enter your Email' name='Email' className='h-10  text-lg border-2 border-gray-200 rounded-md px-3 bg-gray-200 outline-none mb-1' />
                <label className='mb-2 block text-lg font-medium  text-gray-700'>Your Message</label>
                <textarea placeholder='Text here ' name='message ' className='h-40  text-lg border-2 border-gray-200 rounded-md px-3 overflow-y-scroll resize-none bg-gray-200 outline-none mb-1'/>
                <button type="sumbit" className="px-3 my-8 mx-auto w-24 py-3 text-base font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
<svg class="w-4 h-4 text-white me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
<path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
<path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
</svg>
Send
</button>
            </form>
           

        </div>
    </div>
  )
}

export default ContactUs