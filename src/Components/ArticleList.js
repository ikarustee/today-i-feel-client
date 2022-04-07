import React, {useContext, useState, useEffect} from 'react';
import { ArticleContext } from '../Contexts/ArticleContext';
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

const ArticleList = ({p}) => {
  const {articles, isLoading, getArticles} = useContext(ArticleContext)
  const [color, setColor] = useState("#5C90FF");
  const { colorMode, toggleColorMode } = useColorMode()
  
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
        <DotLoader color={color} css={override} loading={!isLoading} size={60} />
      </Container>
    ) : (
     <Container maxW={'7xl'} className="article__list" p="0">
      <Heading as="h1" color="blue.300">All articles</Heading>
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">

          <Box
            width={{ base: '100%', sm: '85%' }}
            // zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                borderRadius="lg"
                src={
                  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                }
                alt="some good alt text"
                objectFit="contain"
              />
            </Link>
          </Box>
          <Box className="bg--dotted" width="100%" position="absolute" height="100%">
            <Box
              className="bg__dotted"
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          {articles.map((a) => {
              const excerpt = Object.values(a.body)
              return (
                <Box key={a._id} bg={colorMode === "light" ? "white" : "gray.700"} className="single" boxShadow={'lg'} m="0" padding="2rem 1rem" borderRadius={8} _hover={{boxShadow: "xl"}} transition="all 300ms ease">
                  <Heading marginTop="1" color="blue.300" as="h2" fontSize="2rem" lineHeight="1.1">
                    <Link href={`articles/${a._id}`} textDecoration="none" _hover={{ textDecoration: 'none' }} _focus={{boxShadow: "none"}}>
                      {a.title}
                    </Link>
                  </Heading>
                  <Text
                    className="excerpt"
                    as="p"
                    marginTop="2"
                    fontSize="md">
                    {excerpt.join("").split(" ").slice(0, 25).join(" ") + " ..."}
                  </Text>
                  <Link href={`articles/${a._id}`} textAlign="center" _hover={{textDecoration: "none"}}>
                  <Button 
                    // className="readmore__btn" 
                      borderColor="transparent" 
                      borderWidth="2px" 
                      color="white" 
                      bg="blue.300"
                      fontWeight="400"
                      height="auto"
                      padding="4px 10px"
                      _hover={{bg: "white", color: "blue.300", border: "2px solid #5C90FF"}} 
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
      <Heading as="h2" marginTop="5">Latest articles</Heading>
      <Divider marginTop="5"  marginBottom="2rem"/>
      <Box className="articles__list">
      {articles.map((a) => {
              const excerpt = Object.values(a.body)
              return (
                <Box key={a._id} bg={colorMode === "light" ? "white" : "gray.700"} className="single" boxShadow={'lg'} m="0" padding="2rem 1rem" borderRadius={8} _hover={{boxShadow: "xl"}} transition="all 300ms ease">
                <Heading marginTop="1" color="blue.300" as="h2" fontSize="2rem" lineHeight="1.1">
                  <Link href={`articles/${a._id}`} textDecoration="none" _hover={{ textDecoration: 'none', color: "purple.300" }} _focus={{boxShadow: "none"}}>
                    {a.title}
                  </Link>
                </Heading>
                <Text
                  className="excerpt"
                  as="p"
                  marginTop="2"
                  fontSize="md">
                  {excerpt.join("").split(" ").slice(0, 25).join(" ") + " ..."}
                </Text>
                  <Link href={`/articles/${a.id}`} textAlign="center" _hover={{textDecoration: "none"}} >
                    <Button 
                      // className="readmore__btn" 
                      borderColor="transparent" 
                      borderWidth="2px" 
                      color="white" 
                      bg="blue.300"
                      fontWeight="400"
                      height="auto"
                      padding="4px 10px"
                      _hover={{bg: "white", color: "blue.300", border: "2px solid #5C90FF"}} 
                      variant='solid'>
                      Read article
                    </Button>
                  </Link>
                </Box>
              )
            })
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