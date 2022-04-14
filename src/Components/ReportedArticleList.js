import React, { useState, useEffect, useContext} from 'react';
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";

import {
  Box,
  Button,
  Heading,
  Flex,
  Divider,
  Container,
  useColorMode
} from '@chakra-ui/react';
import axios from 'axios';
import {useNavigate, Link} from "react-router-dom"
import { Helmet } from 'react-helmet-async';
import { ArticleContext } from '../Contexts/ArticleContext';
import {readableDate} from "../helper/dateformatter"
import { BiEditAlt } from "react-icons/bi";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

const EditArticleList = ({p}) => {
  // const [articles,setArticles] = useState([])
  const {articles, getArticles} = useContext(ArticleContext)
  const [isLoading, setIsLoading] = useState(true)
  const [reportedArticles, setReportedArticles] = useState([]);
  const [color, setColor] = useState("#5C90FF");
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate();
  
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function collectReports(){
  setIsLoading(true)
  let arr = [];
  for(let i = 0; i< articles.length;i++){
      if(JSON.stringify(articles[i].reports).length > 2){
            arr.push(articles[i])
      }
  }
  setReportedArticles(arr)
  setIsLoading(false)
}
useEffect(()=>{
    async function verify(){
        axios.get("https://todayifeel-server.herokuapp.com/verify",{withCredentials:true}).then((response)=>{
            if (response.data !== "OK"){
                alert("Please Login First!")
                navigate("/login");
                }
            })
      }
      getArticles();
  verify();
},[])
useEffect(()=>{
  collectReports();
},[articles])

  return (
    <>
    {isLoading ? (
      <Container className="loader" maxW={'7xl'}>
        <Helmet><title>Today I Feel | Reported Articles</title></Helmet>
        <DotLoader color={color} css={override} loading={!isLoading} size={60} />
      </Container>
    ) : (
     <Container maxW={'800px'} className="article__list" p="0">
      <Helmet><title>Today I Feel | Reported Articles</title></Helmet>
      <Heading as="h1" color="blue.300">Reported articles</Heading>
      <Divider marginTop="5"  marginBottom="2rem"/>
      <Box className="articles__list edit" gap="1rem">
      {reportedArticles
        .map((a) => {
              return (
                <Box 
                key={a._id} 
                bg={colorMode === "light" ? "white" : "gray.700"} 
                className="single" 
                boxShadow={'sm'} m="0" 
                padding="2rem 1rem" 
                borderRadius={8} 
                transition="all 300ms ease">
                  <Box className="edit__title__meta">
                  <h4 className="edit__heading">
                    <Link to={`${a._id}`} textDecoration="none" >
                      {a.title}
                    </Link>
                  </h4>
                  <Box className="meta">
                    <span className="date">Published: {readableDate(a.createdDate)}</span>
                    <span className="reported">Visible: {a.visible ? (<RiEyeLine className="visible" />) : (<RiEyeCloseLine className="visible not" />)}</span>
                  </Box>
                  </Box>
                  <Flex className="edit__action" columnGap="0.5rem">
                  <Link className="edit__btn" to={`${a._id}`}>
                  <Button 
                        className="edit__btn" 
                        border="none"
                        borderRadius={"8px"}
                        color="gray.400" 
                        bg="transparent"
                        fontSize="18px"
                        fontWeight="300"
                        padding="0"
                        _hover={{color: `${colorMode === "light" ? "blue.300" : "gray.400"}`}} 
                        _active={{color: `${colorMode === "light" ? "blue.300" : "gray.400"}`}} 
                        _focus={{color: `${colorMode === "light" ? "blue.300" : "gray.400"}`}} 
                        variant='outline'>
                          <BiEditAlt id={a._id} color="red.600" />
                      </Button>
                  </Link>
                  </Flex>
                  
                </Box>
              )
            })
            }
        </Box>
    </Container>
    )}
    </>
  );
};

export default EditArticleList;