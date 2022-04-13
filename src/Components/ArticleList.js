import React, {useContext, useState, useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArticleContext } from '../Contexts/ArticleContext';
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import {readableDate} from "../helper/dateformatter"

import {
  Box,
  Button,
  Heading,
  Tag,
  Text,
  Divider,
  Container,
  VStack,
  useColorMode
} from '@chakra-ui/react';

const ArticleList = ({p}) => {
  const {articles, isLoading, getArticles} = useContext(ArticleContext)
  const [color, setColor] = useState("#5C90FF");
  const { colorMode } = useColorMode()
  
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

  useEffect(() => {
    getArticles()
  },[])

  return (
    <>
    {isLoading ? (
      <Container className="loader" maxW={'7xl'}>
        <Helmet><title>Today I Feel | Articles</title></Helmet>
        <DotLoader color={color} css={override} loading={!isLoading} size={60} />
      </Container>
    ) : (
     <Container maxW={'7xl'} className="article__list" p="0">
     <Helmet><title>Today I Feel | Articles</title></Helmet>
      <Heading as="h1" color="blue.300" m={"2rem 0"}>Latest article</Heading>
        <Box
          display="flex"
          flex="1"
          gap={"2rem"}
          position="relative"
          justifyContent={"space-between"}
          alignContent={"center"}
          alignItems="center"
          flexWrap={{base: "wrap", md: "nowrap"}}
          >
          <Box className="bg__morph" flexBasis={{base: "100%", md: "35%"}} justifyContent={"center"}></Box>
        <Box
          className="articles__list"
          display="flex"
          flexGrow={"0"}
          flexBasis={{base: "100%", md: "calc(50% - 1rem)"}}
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          {articles
            .filter((a) => a.visible)
            .map((a) => {
              return (
                <Box 
                key={a._id} 
                bg={colorMode === "light" ? "white" : "gray.700"} 
                className="single" 
                boxShadow={'lg'} 
                m="0" 
                borderRadius={8} 
                _hover={{boxShadow: "xl"}} 
                transition="all 300ms ease">
                  <Heading m="1rem 0 0.75rem" color="blue.300" as="h2" fontSize="2rem" lineHeight="1.1">
                  <Link to={`${a._id}`}>
                      {a.title}
                    </Link>
                  </Heading>
                  <Divider m="0 0 0.75rem" />
                  <span className="article__meta">
                    <span className="date">{readableDate(a.createdDate)} &nbsp;</span>
                    {a.tags.map((t) => {
                      return (
                        <Tag className="article__tag" key={t} size={'sm'} variant="solid" colorScheme="blue" color="gray.500" bg="blue.50" transition="all 300ms ease" _hover={{textDecoration: "none", bg: "purple.300"}}>
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
                  <Link to={`${a._id}`}>
                  <Button 
                      borderColor="blue.300" 
                      borderWidth="2px" 
                      color="blue.300" 
                      bg={`${colorMode === "light" ? "white" : "gray.700"}`}
                      fontWeight="400"
                      height="auto"
                      padding="4px 10px"
                      _active={{bg: "blue.300", color: "white", border: "2px solid #5C90FF"}} 
                      _hover={{bg: "blue.300", color: "white", border: "2px solid #5C90FF"}} 
                      variant='solid'>
                      Read article
                    </Button>
                  </Link>
                </Box>
              )
            })
            .slice(0,1)
            }
        </Box>
      </Box>
      <Heading as="h2" marginTop="5">All articles</Heading>
      <Divider marginTop="5"  marginBottom="2rem"/>
      <Box className="articles__list">
      {articles
        .filter((a) => a.visible)
        .map((a) => {
              return (
                <Box 
                key={a._id} 
                bg={colorMode === "light" ? "white" : "gray.700"} 
                className="single" 
                boxShadow={'lg'} 
                m="0" 
                borderRadius={8} 
                _hover={{boxShadow: "xl"}} 
                transition="all 300ms ease">
                <Heading m="1rem 0 0.75rem" color="blue.300" as="h2" fontSize="2rem" lineHeight="1.1">
                  <Link to={`${a._id}`} >
                    {a.title}
                  </Link>
                </Heading>
                <Divider m="0 0 0.75rem" />
                 <span className="article__meta">
                    <span className="date">{readableDate(a.createdDate)} &nbsp;</span>
                    {a.tags.map((t) => {
                      return (
                        <Tag className="article__tag" key={t} size={'sm'} variant="solid" colorScheme="blue" color="gray.500" bg="blue.50" transition="all 300ms ease" _hover={{textDecoration: "none", bg: "purple.300"}}>
                          <Link to={`/search?q=search,${t}`} >{t}</Link>
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
                  <Link to={`${a.id}`} >
                    <Button 
                      borderColor="blue.300" 
                      borderWidth="2px" 
                      color="blue.300" 
                      bg={`${colorMode === "light" ? "white" : "gray.700"}`}
                      fontWeight="400"
                      height="auto"
                      padding="4px 10px"
                      _hover={{bg: "blue.300", color: "white", border: "2px solid #5C90FF"}} 
                      variant='solid'>
                      Read article
                    </Button>
                  </Link>
                </Box>
              )
            })
            .slice(1, articles.length)
            }
        </Box>
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">What we write about</Heading>
        <Text
          className="excerpt" as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text
          className="excerpt" as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text
          className="excerpt" as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
      </VStack>
    </Container>
    )}
    </>
  );
};

export default ArticleList;