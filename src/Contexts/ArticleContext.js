import React, { createContext, useState, useEffect } from "react";
import articleDATA from "../helper/articles.json"

export const ArticleContext = createContext()

let blogPosts = articleDATA
const ArticleContextProvider = ({children}) => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsloading] = useState(true)

    async function getArticles() {
        try {
            // const response = await fetch(URL + location.search)
            // let blogPosts = await response.json()
            // console.log(data)
            blogPosts = blogPosts.map((a) => {
                return {
                    ...a,
                    id: a._id
                }
            });
            setArticles(blogPosts)
            // console.log(blogPosts)
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     getArticles()
    // },[])

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

