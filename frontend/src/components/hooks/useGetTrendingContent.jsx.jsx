import React, { useEffect, useState } from 'react'
import { useContent } from '../../store/content'
import axios from 'axios'

export default function useGetTrendingContent() {
    const {contentType} = useContent()
    const [trendingContent, settrendingContent] = useState(null)
    useEffect(()=>{
        const setContent = async () =>{
        const responce = await axios.get(`/api/${contentType}/v1/trending`, {withCredentials : true})
        settrendingContent(responce.data.content)
        };

        setContent()

    }, [contentType])

    return {trendingContent}
}


