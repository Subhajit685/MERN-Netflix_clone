import React, { useEffect, useRef, useState } from 'react'
import { useContent } from '../store/content'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SMALL_IMG_API } from './utils/imageApi';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MovieCategory({ category }) {

    const {contentType} = useContent()

    const formattedCategory = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1)

    const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

    const [content, setcontent] = useState([])

    useEffect(()=>{
        const getContent = async () =>{
            const res = await axios.get(`http://localhost:5000/${contentType}/api/v1/${category}`, {withCredentials: true})
            setcontent(res.data.details.results)
        }

        getContent()
    },[contentType, category])

    const [showArrow, setshowArrow] = useState(false)

    const slideref = useRef(null)

    const leftScroll = () =>{
        if(slideref.current){
            slideref.current.scrollBy({left: -slideref.current.offsetWidth, behavior:"smooth"})
        }
    }

    const rightScroll = () =>{
        slideref.current.scrollBy({left: slideref.current.offsetWidth, behavior:"smooth"})
    }


  return (
    <div className='bg-black text-white relative px-5 md:px-20' onMouseEnter={()=> setshowArrow(true)} onMouseLeave={()=> setshowArrow(false)}>
        <h1 className='mb-4 text-2xl font-bold'>{formattedCategory} {formattedContentType}</h1>

        <div className='flex space-x-4 overflow-x-scroll no-scrollbar' ref={slideref}>
        {content.map((item)=>(
            <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
                <div className='rounded-lg overflow-hidden'>
                    <img src={SMALL_IMG_API + item?.backdrop_path} alt={contentType + " image"} className='transition-transform duration-300 ease-in-out group-hover:scale-125'/>
                </div>
                <p className='mt-2 text-center'>
                    {item.title || item.name}
                </p>
            </Link>
        ))}
        </div>

        {showArrow && (
            <>
            <button className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' onClick={leftScroll}>

            <ChevronLeft size={24}/>

            </button>

            <button className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' onClick={rightScroll}>

            <ChevronRight size={24}/>

            </button>
            </>
        )}
    </div>
  )
}
