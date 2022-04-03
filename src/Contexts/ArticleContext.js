import React, { createContext, useState, useEffect } from "react";
import articleDATA from "../helper/articles.json"

export const ArticleContext = createContext()

const URL = articleDATA
const ArticleContextProvider = ({children}) => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsloading] = useState(true)

    async function getArticles() {
        try {
            // const response = await fetch(URL)
            // const data = await URL
            // console.log(data)
            const blogPosts = URL.map((a) => {
                return {
                    ...a,
                    id: a._id,
                    title: a.title,
                    body: a.body,
                    tags: a.tags,
                    url: a.url,
                    ext: a.ext,
                    visible: a.visible,
                    createdDate: a.createdDate,
                    updatedDate: a.updatedDate,
                }
            });
            setArticles(blogPosts)
            // console.log(blogPosts)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getArticles()
    },[])

    useEffect(() => {
        if(articles.length) return setIsloading(false)
    }, [articles])

  return (
    <ArticleContext.Provider value={{article: articles, loading: isLoading}}>
        {children}
    </ArticleContext.Provider>
  )
}

export default ArticleContextProvider

