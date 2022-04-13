import React, {useState, useContext} from 'react'
import {useParams} from "react-router-dom"
import { ArticleContext } from '../Contexts/ArticleContext';


const ArticleSuggestions = ({searchParams}) => {
  
  const [filteredArticles, setFilteredArticles] = useState()

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