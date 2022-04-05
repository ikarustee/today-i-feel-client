import React, {useEffect, useState, useContext} from 'react'
import {useSearchParams, createSearchParams, useParams, useLocation} from "react-router-dom"
import { ArticleContext } from '../Contexts/ArticleContext';
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";


const SearchResults = () => {
    // const {articles, isLoading, getArticles, setIsloading} = useContext(ArticleContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const [color, setColor] = useState("#5C90FF");
    // const [searchTags, setSearchTags] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [isLoading, setIsLoading] = useState(true);
  
    async function getSearchResult(){
      setIsLoading(true);
      let searchTags = searchParams.get("q").split(" ").join(",");
      let url = "https://todayifeel-server.herokuapp.com/search/"+searchTags;
      let response = await axios.get(url);
      console.log(response.data);
      setSearchResult(response.data);
      setIsLoading(false);
  }
  useEffect(() => {
    // getArticles(decodeURI(searchParams.get("q").split(" ").join(",")))
    console.log(searchParams.get("q").split(" ").join(","))
    // console.log(searchParams.get("q").split(" ").join("+"))
    getSearchResult();
  },[])

  if(isLoading) {
    return <DotLoader color={color} loading={isLoading} size={60} />
  } else {
    return (
      <div>
        {searchResult.map((a) => {
            console.log(a);
            return(<div key={a._id}>
              <h2>Title: {a.title}</h2>
              <p>TagListe: {a.tags.join(", ")}</p>
              <p>Body: {a.body}</p>
              <br/>
            </div> )       
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