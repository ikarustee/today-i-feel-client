import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const ArticleContext = createContext()

const ArticleContextProvider = ({children}) => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsloading] = useState(true)
    let location = useLocation()

    async function getArticles() {
        const URL = "https://todayifeel-server.herokuapp.com/articles"
        try {
            const response = await axios.get(URL +  location.search)
            let blogPosts = await response.data
            blogPosts = blogPosts.map((a) => {
                return {
                    ...a,
                    id: a._id
                }
            });
            setArticles(blogPosts)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(articles.length) return setIsloading(false)
    }, [articles])

  return (
    <ArticleContext.Provider value={{articles, isLoading, getArticles}}>
        {children}
    </ArticleContext.Provider>
  )
}

export default ArticleContextProvider

