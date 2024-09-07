import React, {useEffect} from 'react'
import {Routes, Route, Navigate } from "react-router-dom"
import Home from './components/Home'
import SingUp from './components/SingUp'
import Login from './components/Login'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useAuthStor } from './store/confiSlice'
import { Loader } from 'lucide-react'
import Watch from './components/Watch'
import SearchPage from './components/SearchPage'
import History from './components/History'
import NotFound from './components/NotFound'

export default function App() {

  const { user, checkAuth, isAuth } = useAuthStor()
  useEffect(()=>{
    checkAuth()
  }, [checkAuth])

  if(isAuth){
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>

        <Loader className='animate-spin text-red-500 size-10'/>

        </div>

      </div>
    )
  }

  return (
    <>
    <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/singup' element={!user ? <SingUp/> : <Navigate to={"/"}/> }/>
        <Route path='/login' element={!user ? <Login/> : <Navigate to={"/"}/>}/>
        <Route path='/watch/:id' element={user ? <Watch/> : <Navigate to={"/login"}/>}/>
        <Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"}/>}/>
        <Route path='/history' element={user ? <History/> : <Navigate to={"/login"}/>}/>
        <Route path='/*' element={<NotFound/>}/>
    </Routes>
    <Toaster/>
    <Footer/>
    </>
  )
}
