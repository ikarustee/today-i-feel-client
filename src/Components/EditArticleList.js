import React, { useState, useEffect, useContext} from 'react';
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";

import {
  Box,
  Button,
  Flex,
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
import { BiEditAlt, BiEraser } from "react-icons/bi";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

const EditArticleList = ({p}) => {
//   const [articles,setArticle] = useState([])
  const {articles, isLoading, getArticles} = useContext(ArticleContext)
//   const [isLoading, setIsLoading] = useState(false)
  const [color, setColor] = useState("#5C90FF");
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate();
  
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const handleDelete = async (e) => {
  const id = e.target.id
  console.log(e.target.id)
  window.confirm("Really delete article?")
  articles.filter((a) => a._id != id)
  let server = "https://todayifeel-server.herokuapp.com/articles/"+id.toString()
  try {
    const res = await axios.delete(server)
    console.log("Article deleted")
    console.log(res)
    // navigate("/editarticles")
  } catch (error) {
    console.log(error)
  }
  // window.location.reload();

  getArticles()
} 

useEffect(()=>{
    async function verifyTest(){
        axios.get("https://todayifeel-server.herokuapp.com/verify",{withCredentials:true}).then((response)=>{
            console.log(response.data !== "OK")
            if (response.data !== "OK"){
                alert("Please Login First!")
                navigate("/login");
                }
            })
    }
    verifyTest();
    getArticles();
},[])

  return (
    <>
    {isLoading ? (
      <Container className="loader" maxW={'7xl'}>
        <DotLoader color={color} css={override} loading={!isLoading} size={60} />
      </Container>
    ) : (
     <Container maxW={'800px'} className="article__list" p="0">
      <Heading as="h1" color="blue.300" m="3rem 0 1rem">All articles</Heading>
      <Divider marginTop="5"  marginBottom="2rem"/>
      <Box className="articles__list edit" gap="1rem">
      {articles.map((a) => {
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
                  <Box className="edit__title__meta">
                    <h4 className="edit__heading">
                      <Link href={`editarticles/${a._id}`} textDecoration="none" _hover={{ textDecoration: 'none', color: "purple.300" }} _focus={{boxShadow: "none"}}>
                        {a.title}
                      </Link>
                    </h4>
                    <Box className="meta">
                      <span className="date">Published: {readableDate(a.createdDate)}</span>
                      <span className="reported">Visible: {a.visible ? (<RiEyeLine className="visible" />) : (<RiEyeCloseLine className="visible not" />)}</span>
                    </Box>
                  </Box>
                  <Flex className="edit__action" columnGap="0.5rem">
                    <Link className="edit__btn" href={`editarticles/${a._id}`} textAlign="center" _hover={{textDecoration: "none"}} >
                      <Button 
                        className="edit__btn" 
                        border="none"
                        borderRadius={"8px"}
                        color="gray.400" 
                        bg="transparent"
                        fontSize="18px"
                        fontWeight="300"
                        // width="20px"
                        // height="20px"
                        padding="0"
                        _hover={{color: `${colorMode === "light" ? "blue.300" : "gray.400"}`}} 
                        // _hover={{color: "white"}} 
                        variant='outline'>
                          <BiEditAlt id={a._id} color="red.600" />
                      </Button>
                    </Link>
                    <Button 
                      className="delete__btn"
                      onClick={(e) => handleDelete(e)} 
                      id={a._id}
                      border="none"
                      borderRadius={"8px"}
                      color="gray.400"  
                      bg="transparent"
                      fontSize="18px"
                      fontWeight="300"
                      padding="0"
                      _hover={{color: `${colorMode === "light" ? "red.600" : "red.600"}`}}  
                      variant='outline'>
                      <BiEraser 
                        onClick={(e) => handleDelete(e)} 
                        id={a._id}
                        color="red.600"
                         />
                    </Button>
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