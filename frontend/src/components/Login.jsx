import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuthStor } from '../store/confiSlice'
import { Loader } from 'lucide-react'

export default function Login() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const { login, isLogin } = useAuthStor()

    const hendelSubmit = (e) =>{
        e.preventDefault()
        login({email, password})
    }
    return (
        <div className='h-screen w-full hero-bg'>
            <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>

                <Link to={"/"}>
                    <img src="/netflix-logo.png" alt="logo" className='w-52' />
                </Link>

            </header>
            <div className='flex justify-center items-center mt-20 mx-3'>

                <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>

                    <h1 className='text-center text-white text-2xl fornt-bold md-4'>Login</h1>

                    <form className='space-y-4' onSubmit={hendelSubmit}>

                        {/* input email */}

                        <div>
                            <label htmlFor="email" className='text-sm font-medium text-gray-300 block'>Email</label>
                            <input type="email" id='email' name='email' className='w-full px-3 py-2 border broder-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                                placeholder='you@example.com' value={email} onChange={(e)=> setemail(e.target.value)}/>
                        </div>

                        {/* input password */}

                        <div>
                            <label htmlFor="password" className='text-sm font-medium text-gray-300 block'>Password</label>
                            <input type="password" id='password' name='password' className='w-full px-3 py-2 border broder-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                                placeholder='********' value={password} onChange={(e)=> setpassword(e.target.value)} />
                        </div>

                        <button className='flex justify-center items-center py-2 w-full text-white bg-red-600 font-semibold rounded-md hover:bg-red-700'>
                            Sing Up {isLogin && <Loader className='animate-spin text-white size-5 mx-3'/>}
                        </button>

                    </form>

                    <div className='text-center text-gray-400'>
                        Don't have a account?{" "}<Link to={"/singup"} className='text-red-500 hover:underline'>Sing Up</Link>
                    </div>

                </div>

            </div>

        </div>
    )
}
