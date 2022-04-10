import React, {useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    FormControl,
    Input,
    Button,
    Radio, 
    RadioGroup,
    Textarea,
    Stack,
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
import axios from 'axios';

const SingleArticle = () => {
    const {articles, isLoading, getArticles} = useContext(ArticleContext)
    const {id} = useParams()
    const thisArticle = articles.find((a) => a.id === id)
    // console.log(thisArticle)
    const [value, setValue] = useState("")
    const [userInput, setUserInput] = useState("")
    const bg = useColorModeValue('blue.300', 'blue.900')
    const color = useColorModeValue('white', 'gray.300')

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

    const handleInputChange = (e) => {
      // console.log(e.target.value)
      setUserInput(e.target.value)
      // console.log(userInput)
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      // console.log(e)
      console.log(userInput, value)
    }

    useEffect(() => {
        getArticles()
    },[])
    
    if (!thisArticle) {
        return <DotLoader color={color} css={override} loading={isLoading} size={60} />;
    } else {
        
    return (
    <>
        <article>
            <Container p="0" maxW={"800px"} >
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
                <Divider m="2rem 0 0.85rem" />
                <em><span className="article__tag label">Tags:</span> &nbsp;
                  {thisArticle.tags.map((t) => {
                    return (
                      <Tag className="article__tag" key={t} size={'sm'} variant="solid" colorScheme="gray" color="gray.500" bg="gray.200" transition="all 300ms ease" _hover={{textDecoration: "none", bg: "purple.300"}}>
                        <Link href={`/search?q=search,${t}`} _hover={{textDecoration: "none", color: "white"}}>{t}</Link>
                      </Tag>
                    )
                  })}
                </em>
                <Divider m="0.5rem 0 0" />
                <Box m="2rem 0">
                <p>Something is wrong in this article? Let us know.</p>
                <FormControl >
                  <form onSubmit={handleSubmit} id="report">
                      <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='row'>
                          <Radio value='Wrong information'>Wrong information</Radio>
                          <Radio value='Outdated'>Outdated</Radio>
                          <Radio value='Other'>Other</Radio>
                        </Stack>
                      </RadioGroup>
                      <Textarea
                        value={userInput}
                        name="issue"
                        onChange={handleInputChange}
                        placeholder="Describe the issue"
                        size='md'
                      />
                      <Button 
                        type="submit"
                      >
                      Submit</Button>
                  </form>
                </FormControl>
              </Box>
            </Container>
        </article>
    </>
  )
}
}

export default SingleArticle