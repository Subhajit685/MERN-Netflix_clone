import React, { useEffect, useState } from 'react'
import { useContent } from "../store/content.js"
import Navbar from "./Navbar"
import { Search } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { ORG_IMG_API } from './utils/imageApi.js'

export default function SearchPage() {
    const [activeTab, setactiveTab] = useState("movie")
    const [searchTerm, setsearchTerm] = useState("")
    const [results, setresults] = useState([])
    const { setContentType } = useContent()

    const hendleClick = (tab) => {
        setactiveTab(tab)
        tab === "movie" ? setContentType("movie") : setContentType("tv")
        setresults([])
    }

    const hendleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get(`/api/search/v1/${activeTab}/${searchTerm}`)
            setresults(res.data.content)
        } catch (error) {
            if (error.response.status === 404) {
                toast.error("Nothing found, Please sure you are searching under the right category")
            } else {
                toast.error("Something wrong, Please try again later")
            }
        }
    }

    return (
        <div className='bg-black min-h-screen text-white'>
            <Navbar />
            <div className='container mx-auto px-4 py-8'>
                <div className='flex justify-center gap-3 mb-4'>
                    <button className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
                        onClick={() => hendleClick("movie")}
                    >
                        Movies
                    </button>

                    <button className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => hendleClick("tv")}>
                        Tv Shows
                    </button>

                    <button className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => hendleClick("person")}>
                        Person
                    </button>
                </div>

                <form onSubmit={hendleSubmit} className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto'>
                    <input type="text" value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)}
                        placeholder={"Search for a " + activeTab}
                        className='w-full p-2 rounded bg-gray-800 text-white' />
                    <button className='bg-red-600 hover:bg-red-700 text-white p-2 rounded'>
                        <Search className='w-6 h-6' />
                    </button>
                </form>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {results.map((result) => (
                        <div className='bg-gray-800 p-4 rounded' key={result.id}>
                            {activeTab === "person" ? (
                                <Link to={`/watch/${result.id}`} className='flex flex-col items-center'>
                                    <img src={ORG_IMG_API + result.profile_path} alt={result.name}
                                        className='max-h-96 rounded mx-auto' />
                                    <h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
                                </Link>
                            ) : (
                                <Link to={`/watch/${result.id}` + result.name} >
                                    <img src={ORG_IMG_API + result.poster_path} alt={result.title || result.name}
                                        className='w-full h-auto rounded' />
                                    <h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
                                </Link>
                            )}


                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
