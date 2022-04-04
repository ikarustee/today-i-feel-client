import React, {useEffect, useState, useContext} from 'react'
import {useSearchParams, createSearchParams, useParams, useLocation} from "react-router-dom"
import { ArticleContext } from '../Contexts/ArticleContext';
import DotLoader from "react-spinners/DotLoader";


const SearchResults = () => {
    const {articles, isLoading, getArticles} = useContext(ArticleContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const [color, setColor] = useState("#5C90FF");

  useEffect(() => {
    getArticles(decodeURI(searchParams.get("q").split(" ").join(",")))
    console.log(searchParams.get("q").split(" ").join(","))
    // console.log(searchParams.get("q").split(" ").join("+"))
  },[])

  if(isLoading) {
    return <DotLoader color={color} loading={isLoading} size={60} />
  } else {
    return (
      <div>
        {articles && articles
          .filter((a) => a.tags.includes(searchParams.get("q")) || a.title.includes(searchParams.get("q")))
          .map((a) => {
            console.log(a.tags)
              return (
                <p key={a.id}>{a.title} Tags are: {a.tags}</p>
              )
          })}
      </div>
    )}
  }
  // .filter((a) => a.tags.includes(searchParams.get("q").split("+").join(" ")))

export default SearchResults

    // let user = searchParams.get("user");

    // const [filteredArticles, setFilteredArticles] = useState()
    // const foundArticles = articles.filter((a) => a.tags.includes(keyword))
    // console.log(searchParams.get("q"))
    // console.log("Search results page")