import React from 'react'
import { assets } from '../../../Frontend/src/assets/frontend_assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between bg-black'>
      <img src={assets.logo} alt="" className='w-[50px] h-[50px]'/>
      <button className='bg-red-500 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full ' onClick={()=>setToken('')}>Logout</button>
    </div>
  )
}

export default Navbar
