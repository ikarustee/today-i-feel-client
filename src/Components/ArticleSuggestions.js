import React, {useEffect, useState, useContext} from 'react'
import {useSearchParams, createSearchParams, useParams} from "react-router-dom"
import { ArticleContext } from '../Contexts/ArticleContext';


const ArticleSuggestions = () => {
    const {userInput} = useParams()
    const {article, loading} = useContext(ArticleContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const [filteredArticles, setFilteredArticles] = useState()
    const foundArticles = article.filter((a) => a.tags.includes("happy"))
    console.log(foundArticles)

    useEffect(() => {
        setSearchParams(createSearchParams(userInput));
    },[])

  return (
    <div>
                {filteredArticles && filteredArticles
        .map((a) => {
            return (

                    <p  key={a.id}>{a.title}</p>

            )
        })}
    </div>
  )
}

export default ArticleSuggestions