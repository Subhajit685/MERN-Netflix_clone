import React from 'react'
import AuthScreen from './home/AuthScreen';
import HomeScreen from "./home/HomeScreen"
import { useAuthStor } from '../store/confiSlice';


export default function Home() {
    const {user} = useAuthStor();
  return (
   <> { user ? <HomeScreen/> : <AuthScreen/>} </>
  )
}
