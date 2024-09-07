import { LogOut, Menu, Search } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStor } from '../store/confiSlice';
import { useContent } from '../store/content';

export default function Navbar() {

  const { user, logout } = useAuthStor()

  const [isMobileOpen, setisMobileOpen] = useState(false)

  const mobileOpen = () => {
    setisMobileOpen(!isMobileOpen)
  }

  const { setContentType } = useContent()

  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>

      <div className='flex
         items-center gap-10 z-50'>
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className='w-32 sm:w-40' />
        </Link>

        {/* desktop navbar items */}

        <div className='hidden sm:flex gap-2 items-center'>
          <Link to={"/"} className='hover:underline' onClick={() => setContentType("movie")}>
            Movies
          </Link>
          <Link to={"/"} className='hover:underline' onClick={() => setContentType("tv")}>
            TV Shows
          </Link>
          <Link to={"/history"} className='hover:underline'>
            Search History
          </Link>
        </div>
      </div>

      <div className='flex gap-2 items-center z-50'>
        <Link to={"/search"}>
          <Search className='size-6 cursor-pointer' />
        </Link>

        <img src={user.userImage} alt="User Image" className='h-8 cursor-pointer' />
        <LogOut className='size-6 cursor-pointer' onClick={logout} />

        <div className='sm:hidden'>
          <Menu className='size-6 cursor-pointer' onClick={mobileOpen} />
        </div>
      </div>

      {/* mobile navbar items */}
      {isMobileOpen && (
        <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>

          <Link to={"/"} className='block hover:underline p-2' onClick={mobileOpen}>
            Movies
          </Link>
          <Link to={"/"} className='block hover:underline p-2' onClick={mobileOpen}>
            TV Shows
          </Link>
          <Link to={"/history"} className='block hover:underline p-2' onClick={mobileOpen}>
            Search History
          </Link>
        </div>)}
    </header>
  )
}
