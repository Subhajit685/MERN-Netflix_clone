import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='h-screen w-full bgimage object-cover'>
        <img src="/netflix-logo.png" alt="" className='h-20 my-5 mx-5'/>
        <Link to={"/"} className='h-4 w-7 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-700 mx-5'>
        Go to home page
        </Link>
    </div>
  )
}
