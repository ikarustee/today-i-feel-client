import React, {useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ArticleContext } from '../Contexts/ArticleContext';
import articleDATA from "../helper/articles.json"
import DotLoader from "react-spinners/DotLoader";
import {
    Box,
    Button,
    Heading,
    Link,
    Image,
    Text,
    Divider,
    HStack,
    Tag,
    Wrap,
    WrapItem,
    SpaceProps,
    useColorModeValue,
    Container,
    VStack,
  } from '@chakra-ui/react';

const URL = articleDATA

const SingleArticle = () => {
    const {articles, isLoading, getArticles} = useContext(ArticleContext)
    const {id} = useParams()
    const thisArticle = articles.find((a) => a.id === id)
    console.log(thisArticle)
    const [color, setColor] = useState("#5C90FF");

    useEffect(() => {
        getArticles()
      },[])

    if (!thisArticle) {
        return <DotLoader color={color} loading={isLoading} size={60} />;
      } else {

  return (
    <>
    <Container>
        <Heading as="h1" color="blue.300">{thisArticle.title}</Heading>
        <Text as="p">{thisArticle.body}</Text>
    </Container>
    </>
  )
}
}

export default SingleArticle

/*

    useEffect(() => {
        if(post && post.find((a) => a.id === id)) {
            setThisArticle(post.find((a) => a.id === id))
        } else {
            async function SingleArticle() {
                try {
                    const response = await fetch(URL)
                    const data = await response.json()
                    setThisArticle(data[0])
                } catch (error) {
                    console.log(error)
                }
            }
        }
        SingleArticle()
    }, [id])

*/