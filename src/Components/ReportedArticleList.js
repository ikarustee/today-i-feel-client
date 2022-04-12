import React, { useState, useEffect, useContext} from 'react';
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";

import {
  Box,
  Button,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  Container,
  VStack,
  useColorMode
} from '@chakra-ui/react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { ArticleContext } from '../Contexts/ArticleContext';
import {readableDate} from "../helper/dateformatter"

const EditArticleList = ({p}) => {
  // const [articles,setArticles] = useState([])
  const {articles, isLoading, getArticles} = useContext(ArticleContext)
  const [reportedArticles, setReportedArticles] = useState([]);
  const [color, setColor] = useState("#5C90FF");
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate();
  
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
// async function getData(){
//     setIsLoading(true);
//     let response = await axios.get("https://todayifeel-server.herokuapp.com/reports")
//     setArticles(response.data)
//     console.log(response.data)
//     setIsLoading(false)
// }
function collectReports(){
  let arr = [];
  for(let i = 0; i< articles.length;i++){
      if(articles[i].reportReason !== "/" || articles[i].reportComment !== "/"){
        arr.push(articles[i])
      }
  }
  setReportedArticles(arr)

}
useEffect(()=>{
    async function setup(){
        axios.get("https://todayifeel-server.herokuapp.com/verify",{withCredentials:true}).then((response)=>{
            console.log(response.data !== "OK")
            if (response.data !== "OK"){
                alert("Please Login First!")
                navigate("/login");
                }
            }).then((response)=>{
              getArticles()
            }).then((response)=>{
              collectReports();
            })
    }
  setup();
},[])

  return (
    <>
    {!reportedArticles ? (
      <Container className="loader" maxW={'7xl'}>
        <DotLoader color={color} css={override} loading={!isLoading} size={60} />
      </Container>
    ) : (
     <Container maxW={'800px'} className="article__list" p="0">
      <Heading as="h1" color="blue.300">Reported articles</Heading>
      <Divider marginTop="5"  marginBottom="2rem"/>
      <Box className="articles__list edit" gap="1rem">
      {reportedArticles
        .map((a) => {
              const excerpt = Object.values(a.body)
              return (
                <Box 
                key={a._id} 
                bg={colorMode === "light" ? "white" : "gray.700"} 
                className="single" 
                boxShadow={'sm'} m="0" 
                padding="2rem 1rem" 
                borderRadius={8} 
                transition="all 300ms ease">
                  <h4 className="edit__heading">
                    <Link href={`reportedarticles/${a._id}`} textDecoration="none" _hover={{ textDecoration: 'none', color: "purple.300" }} _focus={{boxShadow: "none"}}>
                      {a.title}
                    </Link>
                  </h4>
                  <Link className="edit__btn" href={`reportedarticles/${a._id}`} textAlign="center" _hover={{textDecoration: "none"}} >
                    <Button 
                      // className="readmore__btn" 
                      borderColor="blue.300" 
                      borderWidth="1px" 
                      color="blue.300" 
                      bg="white"
                      fontSize="12px"
                      fontWeight="300"
                      height="auto"
                      padding="4px 10px"
                      _hover={{bg: "blue.300", color: "white", border: "1px solid #5C90FF"}} 
                      variant='outline'>
                      Edit
                    </Button>
                  </Link>
                  <Box className="meta">
                    <span className="date">Published: {readableDate(a.createdDate)}</span>
                    <span className="reported">Visible: {a.visible ? "🟢" : "🔴"}</span>
                  </Box>
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