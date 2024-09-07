import { useEffect, useState, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { useContent } from '../store/content.js'
import axios from "axios"
import Navbar from "./Navbar.jsx"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ReactPlayer from "react-player"
import { ORG_IMG_API, SMALL_IMG_API } from "./utils/imageApi.js"
import WatchSkleton from "./skleton/WatchSkleton.jsx"

export default function Watch() {
    const { id } = useParams()
    const { contentType } = useContent()

    const [trailer, settrailer] = useState([])
    const [trailerIndex, settrailerIndex] = useState(0)
    const [content, setcontent] = useState({})
    const [loading, setloading] = useState(true)
    const [similerContent, setsimilerContent] = useState([])

    useEffect(() => {
        const getTrailer = async () => {
            const res = await axios.get(`http://localhost:5000/${contentType}/api/v1/${id}/trailer`, { withCredentials: true })
            settrailer(res.data.trailer)
        }
        getTrailer()
    }, [contentType, id])

    useEffect(() => {
        const getSimilerContent = async () => {
            const res = await axios.get(`http://localhost:5000/${contentType}/api/v1/${id}/similer`, { withCredentials: true })
            setsimilerContent(res.data.details)
        }

        getSimilerContent()
    }, [contentType, id])

    useEffect(() => {
        const getDetiles = async () => {
            const res = await axios.get(`http://localhost:5000/${contentType}/api/v1/${id}/details`, { withCredentials: true })
            setcontent(res.data.details)
            setloading(false)
        }

        getDetiles()
    }, [contentType, id])


    const hendlePre = () => {
        console.log("click")
        if (trailerIndex > 0) {
            settrailerIndex(trailerIndex - 1)
        }
    }

    const hendleNext = () => {
        console.log("click")
        if (trailerIndex < trailer.length - 1) {
            settrailerIndex(trailerIndex + 1)
        }
    }


    const slideref = useRef(null)

    const leftScroll = () => {
        if (slideref.current) {
            slideref.current.scrollBy({ left: -slideref.current.offsetWidth, behavior: "smooth" })
        }
    }

    const rightScroll = () => {
        slideref.current.scrollBy({ left: slideref.current.offsetWidth, behavior: "smooth" })
    }

    if (loading) return (
        <div className="min-h-screen bg-black p-10">
            <WatchSkleton />
        </div>
    )
    if (!content) return (
        <div className="text-xl text-center mt-5">
            No Content Available For{" "} <span className="font-bold text-red-600">{content?.title || content?.name}</span>
        </div>
    )


    return (
        <div className="bg-black min-h-screen text-white">
            <div className="mx-auto container px-4 py-8 h-full">
                <Navbar />
                {trailer.length > 0 && (
                    <div className="flex justify-between items-center mb-4">
                        <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${trailerIndex === 0 ? "cursor-not-allowed opacity-50" : ""}`} disabled={trailerIndex === 0}
                            onClick={hendlePre}
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${trailerIndex === trailer.length - 1 ? "cursor-not-allowed opacity-50" : ""}`} disabled={trailerIndex === trailer.length - 1}
                            onClick={hendleNext}
                        >
                            <ChevronRight size={24} />
                        </button>

                    </div>
                )}

                <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
                    {trailer.length > 0 && (
                        <ReactPlayer
                            controls={true}
                            width={"100%"}
                            height={"70vh"}
                            className="mx-auto overflow-hidden rounded-lg"
                            url={`https://www.youtube.com/watch?v=${trailer[trailerIndex].key}`}
                        />
                    )}

                    {trailer?.length === 0 && (
                        <div className="text-xl text-center mt-5">
                            No Trailer Available For{" "} <span className="font-bold text-red-600">{content?.title || content?.name}</span>
                        </div>
                    )}

                </div>

                {/* movie detiles */}

                <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-5xl font-bold text-balance">{content?.title || content?.name}</h2>
                        <p className="mt-2 text-lg">
                            {content?.release_date || content?.first_air_date} |{" "}
                            {content?.adult ? (
                                <span className="text-red-600">18+</span>
                            ) : (
                                <span className="text-red-600">PG-13</span>
                            )}{" "}
                        </p>
                        <p className="mt-4 text-lg">
                            {content?.overview}
                        </p>

                    </div>
                    <img src={ORG_IMG_API + content.poster_path  || ORG_IMG_API + content?.profile_path} alt="Poster path" className="md:max-h-[600px] rounded-md sm:max-h-[400px]" />

                </div>


                {similerContent.length > 0 && (

                    <div className='bg-black text-white relative px-5 md:px-20'>
                        <h1 className='mb-4 text-2xl font-bold'>Similer {contentType}</h1>

                        <div className='flex space-x-4 overflow-x-scroll no-scrollbar' ref={slideref}>
                            {similerContent.map((item) => (
                                <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
                                    <div className='rounded-lg overflow-hidden'>
                                        <img src={SMALL_IMG_API + item?.poster_path} alt={contentType + " image"} />
                                    </div>
                                    <p className='mt-2 text-center'>
                                        {item.title || item.name}
                                    </p>
                                </Link>
                            ))}
                        </div>

                        <button className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' onClick={leftScroll}>

                            <ChevronLeft size={24} />

                        </button>

                        <button className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' onClick={rightScroll}>

                            <ChevronRight size={24} />

                        </button>

                    </div>
                )}



            </div>

        </div>
    )
}


{/* className='transition-transform duration-300 ease-in-out group-hover:scale-125' */ }