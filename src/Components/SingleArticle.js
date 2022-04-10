import React, {useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Heading,
    Link,
    Tag,
    Divider,
    Container,
    useColorModeValue
  } from '@chakra-ui/react';
import { ArticleContext } from '../Contexts/ArticleContext';
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";
import ReactMarkdown from "react-markdown";  
import {readableDate} from "../helper/dateformatter"

const SingleArticle = () => {
    const {articles, isLoading, getArticles} = useContext(ArticleContext)
    const {id} = useParams()
    const thisArticle = articles.find((a) => a.id === id)
    console.log(thisArticle)

    const bg = useColorModeValue('blue.300', 'blue.900')
    const color = useColorModeValue('white', 'gray.300')

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
            <Container p="0">
              <Box
                bg={bg} 
                color={color}
                borderRadius="12px"
                p={8}
                marginBottom="2rem"
                >
                <Heading color={color} as="h1" fontSize="2.5rem" textAlign="center">{thisArticle.title}</Heading>
                <span className="article__date">{readableDate(thisArticle.createdDate)}</span>
              </Box>
                 <ReactMarkdown className="article__content">{thisArticle.body}</ReactMarkdown>
                <Divider m="2rem 0 0.75rem" />
                <em><span className="article__tag label">Tags:</span> &nbsp;
                  {thisArticle.tags.map((t) => {
                    return (
                      <Tag className="article__tag" key={t} size={'sm'} variant="solid" colorScheme="gray" color="gray.500" bg="gray.200" transition="all 300ms ease" _hover={{textDecoration: "none", bg: "purple.300"}}>
                        <Link href={`/search?q=search,${t}`} _hover={{textDecoration: "none", color: "white"}}>{t}</Link>
                      </Tag>
                    )
                  })}
                <Divider m="0.5rem 0 0" />
                </em>
            </Container>
        </article>
    </>
  )
}
}

export default SingleArticle