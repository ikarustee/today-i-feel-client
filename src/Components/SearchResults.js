import React, {useEffect, useState, useContext} from 'react'
import {useSearchParams, Link} from "react-router-dom"
import { Helmet } from 'react-helmet-async';
import { ArticleContext } from '../Contexts/ArticleContext';
import Chart from "./Chart"
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Tag,
  Text,
  Divider,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";
import axios from "axios";
import {readableDate} from "../helper/dateformatter"
import { BiRightArrowAlt } from "react-icons/bi";


const SearchResults = (props) => {
    const {articles, isLoading, getArticles} = useContext(ArticleContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const [color, setColor] = useState("#5C90FF");
    const [searchResult, setSearchResult] = useState([]);
    const bg = useColorModeValue('blue.300', 'blue.900')
    const fontColor = useColorModeValue('white', 'gray.300')
    
    const { colorMode, toggleColorMode } = useColorMode()

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  
    let searchTags = searchParams.get("q").split(",")
    let arr = searchTags.map(tag=>{return tag.trim()})
    searchTags = arr.join(",")
    let sanitizedSearchTags = searchTags.split(",").slice(1).join(" ")
    async function getSearchResult(){
      if(searchParams.get("q").split(" ").join(",").split(",")[0] === "search"){
        let url = "https://todayifeel-server.herokuapp.com/search/"+searchTags;
        let response = await axios.get(url,{withCredentials:true});
        setSearchResult(response.data);
      } else if(searchParams.get("q").split(" ").join(",").split(",")[0] === "vote"){
        let arr = searchTags.split(",")
        arr.shift()
        arr.unshift("search")
        arr.join(",")
        let url = "https://todayifeel-server.herokuapp.com/search/"+arr.join(",");
        let response = await axios.get(url,{withCredentials:true});
        setSearchResult(response.data);
      } else if(searchParams.get("q").split(" ").join(",").split(",")[0] === "voted"){
        let arr = searchTags.split(",")
        arr.shift()
        arr.unshift("search")
        arr.join(",")
        let url = "https://todayifeel-server.herokuapp.com/search/"+arr.join(",");
        let response = await axios.get(url,{withCredentials:true});
        setSearchResult(response.data);
      }
  }
  useEffect(() => {
    getArticles(decodeURI(searchParams.get("q").split(" ").join(",")))
    getSearchResult();
  },[searchParams])

  if(isLoading) {
    return (
      <Container className="loader" maxW={'7xl'}>
        <DotLoader color={color} css={override} loading={!isLoading} size={60} />
      </Container>
    )
  } else {
    return (
      <>
      <Helmet><title>Today I Feel | Search Results</title></Helmet>
      <Container className="articles" maxW={'7xl'} minH="100vh" m="2rem 0" p="0">
      <Heading as="h1" color="blue.300" m="1rem 0">{searchTags.includes("search") ? `Search results for: "${sanitizedSearchTags}"` : `Suggested articles for: "${sanitizedSearchTags}"`}</Heading>
      <Flex flexWrap="wrap" gap="1rem" className="articles__list">
        {searchResult
          .filter((a) => a.visible)
          .map((a) => {
            return(
              <Box
                key={a._id} 
                bg={colorMode === "light" ? "white" : "gray.700"} 
                className="single" 
                boxShadow={'lg'} 
                m="0" 
                borderRadius={8} 
                _hover={{boxShadow: "xl"}} 
                transition="all 300ms ease"
                >
                <Heading className="articles__heading" m="1rem 0" color="blue.300" as="h2" size="2xl" fontSize="2rem" lineHeight="1.1" _hover={{color: "purple.300"}}>
                  <Link to={`/articles/${a._id}`}>
                    {a.title}
                  </Link>
                </Heading>
                <Divider m="0 0 0.75rem" />
                <span className="article__meta">
                  <span className="date">{readableDate(a.createdDate)} &nbsp;</span>
                  {a.tags.map((t) => {
                    return (
                      <Tag className="article__tag" key={t} size={'sm'} variant="solid" colorScheme="blue" color="gray.500" bg="blue.50" transition="all 300ms ease" _hover={{textDecoration: "none", bg: "purple.300", color: "white"}}>
                        <Link to={`/search?q=search,${t}`}>{t}</Link>
                      </Tag>
                    )
                  })}
                </span>
                <Divider m="0.5rem 0 0" />
                <Text
                  className="excerpt"
                  as="p"
                  marginTop="2"
                  fontSize="md">
                  {a.body.replace(/[#_]/g,'').split(" ").slice(0, 25).join(" ") + " ..."}
                </Text>
                <Link to={`/articles/${a._id}`}  className="readmore"> 
                  <Button 
                      className="readmore__btn" 
                      color="blue.300" 
                      bg={`${colorMode === "light" ? "white" : "gray.700"}`}
                      fontWeight="400"
                      height="auto"
                      padding="0"
                      _hover={{bg: "white", color: "purple.300"}} 
                      variant='solid' >
                      Read article
                    </Button>
                </Link>
            </Box> )       
        }
        )}
      </Flex>
      <Chart /> 
        <Box
          className="info__holder"
        >
        <Heading 
          as="h2" 
          size="2xl" 
          textAlign={"center"} 
          color={"blue.300"}
          marginBottom="2rem"
        >
        Seeking for professional help?</Heading>
        <Flex 
          className="info__content"
          bg={bg} 
          color={fontColor}
          borderRadius="12px"
          boxShadow={"lg"}
        >
        <BiRightArrowAlt />
        <h2>Crisis helpline <strong><a href="tel:+4908001110111" className="info__link">0800 1110111</a></strong> or <strong><a href="tel:+4908001110222" className="info__link">0800 1110222</a></strong></h2>
        </Flex>
        <Flex 
          className="info__content"
          bg={bg} 
          color={fontColor}
          borderRadius="12px"
          boxShadow={"lg"}
          >
          <BiRightArrowAlt />
          <h2>Instahelp ??? professional online psychological counseling <strong><a href="https://instahelp.me/de/" target="_blank" className="info__link">instahelp.me/de/</a></strong></h2>
        </Flex>
        </Box>
      </Container>
      </>
    )}
  }

export default SearchResults