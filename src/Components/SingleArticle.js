import React, {useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ArticleContext } from '../Contexts/ArticleContext';
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";
import {
    Box,
    Button,
    Heading,
    Link,
    Tag,
    Text,
    Divider,
    Container,
  } from '@chakra-ui/react';
import ReactMarkdown from "react-markdown";  
import {readableDate} from "../helper/dateformatter"

const SingleArticle = () => {
    const {articles, isLoading, getArticles} = useContext(ArticleContext)
    const {id} = useParams()
    const thisArticle = articles.find((a) => a.id === id)
    const [articleDate, setArticleDate] = useState()
    console.log(thisArticle)
    const [color, setColor] = useState("#5C90FF");
  
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

    useEffect(() => {
        getArticles()
    },[])
    
    if (!thisArticle) {
        return <DotLoader color={color} css={override} loading={isLoading} size={60} />;
    } else {
        
    return (
    <>
        <article>
            <Container>
                <Heading as="h1" color="blue.300" fontSize="2.5rem">{thisArticle.title}</Heading>
                {readableDate(thisArticle.createdDate)}
                 <ReactMarkdown className="article__content">{thisArticle.body}</ReactMarkdown>
                <em>Tags: &nbsp;
                {thisArticle.tags.map((t) => {
                  return (
                    <Tag className="article__tag" key={t} size={'sm'} variant="solid" colorScheme="gray" color="gray.500" bg="gray.200">{t}</Tag>
                  )
                })}
                </em>
            </Container>
        </article>
    </>
  )
}
}

export default SingleArticle