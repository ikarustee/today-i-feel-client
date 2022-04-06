import React, {useEffect, useState, useContext} from 'react'
import {useSearchParams, createSearchParams, useParams, useLocation} from "react-router-dom"
import { ArticleContext } from '../Contexts/ArticleContext';
import Chart from "./Chart"
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Image,
  Tag,
  Text,
  Divider,
  VStack,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";
import axios from "axios";


const SearchResults = () => {
    // const {articles, isLoading, getArticles, setIsloading} = useContext(ArticleContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const [color, setColor] = useState("#5C90FF");
    // const [searchTags, setSearchTags] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    // const [tagURL, setTagURL] = useState("")
    const { colorMode, toggleColorMode } = useColorMode()

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  
    async function getSearchResult(){
      setIsLoading(true);
      let searchTags = searchParams.get("q").split(" ").join(",");
      let url = "https://todayifeel-server.herokuapp.com/search/"+searchTags;
      let response = await axios.get(url,{withCredentials:true});
      console.log(typeof response.data);
      setSearchResult(response.data);
      setIsLoading(false);
      // setTagURL(url)
  }
  useEffect(() => {
    // getArticles(decodeURI(searchParams.get("q").split(" ").join(",")))
    console.log(searchParams.get("q").split(" ").join(","))
    // console.log(searchParams.get("q").split(" ").join("+"))
    getSearchResult();
  },[])

  if(isLoading) {
    return (
      <Container className="loader" maxW={'7xl'}>
        <DotLoader color={color} css={override} loading={!isLoading} size={60} />
      </Container>
    )
  } else {
    return (
      <>
      <Container className="articles" maxW={'7xl'} minH="100vh" m="2rem 0" p="0">
      <Heading as="h1" color="blue.300" m="1rem 0">Results</Heading>
        <Flex flexWrap="wrap" gap="1rem">
          {typeof searchResult === "string" ? (<p>{searchResult}</p>):(searchResult.map((a) => {
              {/* console.log(a)
              console.log(a.tags) */}
              const excerpt = Object.values(a.body)
              return(
                <Box
                 className="single" bg={colorMode === "light" ? "white" : "gray.700"} key={`articles/${a._id}`} boxShadow={'lg'} m="0" padding="2rem 1rem" borderRadius={8} _hover={{boxShadow: "xl"}} transition="all 300ms ease">
                  <Heading className="articles__heading" m="1rem 0" color="blue.300" as="h2" fontSize="2rem" lineHeight="1.1" _hover={{color: "purple.300"}}>
                    <Link href={`articles/${a._id}`} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                      {a.title}
                    </Link>
                  </Heading>
                  <em> Tags: &nbsp;
                  {a.tags.map((t) => {
                    return (
                      <Tag className="article__tag" key={t} size={'sm'} variant="solid" colorScheme="gray" color="gray.500" bg="gray.200">{t}</Tag>
                    )
                  })}
                  </em>
                  <Text
                    className="excerpt"
                    as="p"
                    marginTop="2"
                    fontSize="md">
                    {excerpt.join("").split(" ").slice(0, 25).join(" ") + " ..."}
                  </Text>
                  <Link href={`articles/${a._id}`} className="readmore__btn" color="blue.300" fontWeight={500} textAlign="left" textDecoration="none" _hover={{color: "purple.300"}}>Read article</Link>
                <br/>
              </Box> )       
          }
          ))}
        </Flex>
      <Chart /> 
      </Container>
      </>
    )}
  }
  // .filter((a) => a.tags.includes(searchParams.get("q").split("+").join(" ")))

export default SearchResults

    // let user = searchParams.get("user");

    // const [filteredArticles, setFilteredArticles] = useState()
    // const foundArticles = articles.filter((a) => a.tags.includes(keyword))
    // console.log(searchParams.get("q"))
    // console.log("Search results page")