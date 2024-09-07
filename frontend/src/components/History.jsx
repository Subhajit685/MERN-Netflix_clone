import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { SMALL_IMG_API } from './utils/imageApi'
import { Delete, Trash } from 'lucide-react'
import toast from 'react-hot-toast'


export default function History() {

    const [searchHistory, setsearchHistory] = useState([])

    const hendleDelete = async (id) =>{
        try {
            await axios.delete(`/api/search/v1/history/${id}`)
            setsearchHistory(searchHistory.filter((word) => word.id !== id));
            toast.success("Deleted successfully")
        } catch (error) {
            console.log(error.message)
            toast.error("Not deleted")
        }
    }

    useEffect(() => {
        const getHistory = async () => {
            try {
                const res = await axios.get(`/api/search/v1/history`)
                setsearchHistory(res.data.history)
            } catch (error) {
                console.log(error.message)
                setsearchHistory([])
            }
        }
        getHistory()
    }, [])


    return (
        <div className='bg-black to-white min-h-screen'>
        <Navbar />
        <div className='max-w-6xl mx-auto px-4 py-8'>
            <h1 className='text-white text-3xl font-bold mb-8'>Search History</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {searchHistory.map((item) => {
                    return (
                        <div key={item.createdAt} className='relative bg-gray-800 p-4 rounded flex items-start'>
                            <img src={SMALL_IMG_API + item.image} alt="History image" className='size-16 rounded-full object-cover mr-4' />
                            <div className='flex flex-col'>
                                <span className='text-white text-lg'>{item.name}</span>
                                <span className='text-gray-400 text-sm'>{item.createdAt}</span>
                            </div>
                            <Trash className='mx-8 fill-white text-blue-50 cursor-pointer hover:fill-gray-500' onClick={()=>hendleDelete(item.id)}/>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
    
    )
}

