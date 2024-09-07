import React from 'react'
import Navbar from '../Navbar'
import { Link } from 'react-router-dom'
import { Info, Play } from 'lucide-react'
import useGetTrendingContent from '../hooks/useGetTrendingContent.jsx'
import { MOVIE_CATEGORY, ORG_IMG_API, TV_CATEGORY } from '../utils/imageApi.js'
import { useContent } from '../../store/content.js'
import MovieCategory from '../MovieCategory.jsx'


export default function homeScreen() {

  const { trendingContent } = useGetTrendingContent()
  const { contentType } = useContent()

  if(!trendingContent)
    return (
      <div className='h-screen text-white relative'>
      <Navbar/>
      <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer'/>

      </div>
    )
  

  return (
    <>
      <div className='relative h-screen text-white bg-black'>

        {/* navbar */}

        <Navbar />

        <img src={ORG_IMG_API + trendingContent?.backdrop_path} alt="Hero img" className='absolute top-0 w-full h-full object-cover -z-9' />

        <div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-9' aria-hidden="true" />

        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>

          <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-9'/>


          <div className='max-w-2xl'>

            <h1 className='mt-4 text-6xl font-extrabold text-balance'>
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className='mt-2 text-lg'>
              {trendingContent?.release_date || trendingContent?.first_air_date} | {trendingContent?.adult ? "18+" : "PG-13"} | {trendingContent?.media_type}
            </p>

            <p className='mt-4 text-lg'>
              {trendingContent?.overview}
            </p>
          </div>

          <div className='flex mt-8'>

            <Link to={`/watch/${trendingContent?.id}`} className='bg-white text-black py-2 px-4 rounded mr-4 flex items-center z-50'>
            <Play className='size-6 mr-2 fill-black'/>
            Play
            </Link>

            <Link to={"/watch/123"} className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded mr-4 flex items-center'>

            <Info className='size-6 mr-2'/>
            MoreInfo
            </Link>

          </div>

        </div>

      </div>

    <div className='flex flex-col gap-10 bg-black py-10'>

      {contentType === "movie" ? 
        MOVIE_CATEGORY.map((category)=> <MovieCategory key={category} category={category}/> ) : 
        TV_CATEGORY.map((category)=> <MovieCategory key={category} category={category}/>)}
    </div>
    </>
  )
}
