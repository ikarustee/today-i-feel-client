import React, {useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    FormControl,
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
    useColorMode,
    useColorModeValue
  } from '@chakra-ui/react';
import { ArticleContext } from '../Contexts/ArticleContext';
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";
import ReactMarkdown from "react-markdown";  
import {readableDate} from "../helper/dateformatter"
import { BiMessageSquare } from 'react-icons/bi';
import axios from 'axios';

const SingleArticle = () => {
    const {articles, isLoading, getArticles} = useContext(ArticleContext)
    const {id} = useParams()
    const thisArticle = articles.find((a) => a.id === id)
    // console.log(thisArticle)
    const [value, setValue] = useState("")
    const [userInput, setUserInput] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { colorMode, toggleColorMode } = useColorMode()
    
    const [mailerState, setMailerState] = useState({
      message: "",
      article: ""
    });
    
    const disabled = mailerState.message === "" || mailerState.message.length <= 10
    const bg = useColorModeValue('blue.300', 'blue.900')
    const color = useColorModeValue('white', 'gray.300')

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

    // let handleInputChange = (e) => {
    //   // console.log(e.target.value)
    //   setUserInput(e.target.value)
    // }

    function handleStateChange(e) {
      // console.log(e.target.value)
      setMailerState((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        article: thisArticle,
        value: value,
      }));
    }

    const submitEmail = async (e) => {
      e.preventDefault();
      console.log(e.target)
      console.log({ mailerState });
      const response = await axios.post("http://localhost:3010/send", { mailerState })
      const resData = await response
      console.log(resData)
      if(resData.status === "success") {
        alert("Message sent")
      } else if(resData.status === "Fail") {
        alert("Message failed to sent")
      }
      setMailerState({
        message: "",
        article: ""
      });
    };

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
                <FormControl isRequired>
                  <form onSubmit={submitEmail}>
                    <fieldset>
                      <legend>Something is not correct or inproper? Let us know.</legend>
                      <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='row'>
                          <Radio value='Wrong information'>Wrong information</Radio>
                          <Radio value='Outdated'>Outdated</Radio>
                          <Radio value='Other'>Other</Radio>
                        </Stack>
                      </RadioGroup>
                      <input
                        type="hidden"
                        name="article"
                        onChange={handleStateChange}
                        value={thisArticle.title}
                        />
                      <Textarea
                        placeholder="Message"
                        onChange={handleStateChange}
                        name="message"
                        value={mailerState.message}
                        size={"md"}
                        minLength={"10"}
                        isRequired
                      />
                      {errorMessage}
                      {disabled ? (
                        <Button
                          borderColor="gray.400" 
                          borderWidth="2px" 
                          color="gray.400" 
                          bg={`${colorMode === "light" ? "gray.200" : "gray.700"}`}
                          fontWeight="400"
                          height="auto"
                          padding="4px 10px"
                          _hover={{bg: "gray.200", color: "gray.400", border: `2px solid #A0AEC0`}} 
                          variant='solid'
                      >Send Message</Button>
                      ) : (
                      <Button
                        onSubmit={submitEmail}
                        type="submit"
                        borderColor="blue.300" 
                        borderWidth="2px" 
                        color="blue.300" 
                        bg={`${colorMode === "light" ? "white" : "gray.700"}`}
                        fontWeight="400"
                        height="auto"
                        padding="4px 10px"
                        _active={{bg: "blue.300", color: "white", border: "2px solid #5C90FF"}} 
                        _hover={{bg: "blue.300", color: "white", border: "2px solid #5C90FF"}} 
                        variant='solid'
                      >Send Message</Button>
                      )}
                    </fieldset>
                  </form>
                </FormControl>
                {/* <p>Something is wrong in this article? Let us know.</p>
                <FormControl >
                  <form id="report">
                      <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='row'>
                          <Radio value='Wrong information'>Wrong information</Radio>
                          <Radio value='Outdated'>Outdated</Radio>
                          <Radio value='Other'>Other</Radio>
                        </Stack>
                      </RadioGroup>
                      <Textarea
                        value={userInput.text}
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
                </FormControl> */}
            </Container>
        </article>
    </>
  )
}
}

export default SingleArticle