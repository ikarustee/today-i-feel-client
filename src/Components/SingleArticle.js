import React, {useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    FormControl,
    Button,
    Flex,
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
import { BiMessageSquare, BiRightArrowAlt } from 'react-icons/bi';
import axios from 'axios';

const SingleArticle = () => {
    const {articles, isLoading, getArticles} = useContext(ArticleContext)
    const {id} = useParams()
    const thisArticle = articles.find((a) => a.id === id)
    const [value, setValue] = useState("")
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const { colorMode, toggleColorMode } = useColorMode()
    
    const [mailerState, setMailerState] = useState({
      message: "",
      value:"",
      article: thisArticle
    });
    
    const disabled = mailerState.message === "" || mailerState.message.length <= 10
    const bg = useColorModeValue('blue.300', 'blue.900')
    const color = useColorModeValue('white', 'gray.300')
    const fontColor = useColorModeValue('white', 'gray.300')
    const formColor = useColorModeValue('gray.600', 'gray.200')

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;


    function handleStateChange(e) {
      // console.log(e.target.name, e.target.value)
      setMailerState((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        articleTitle: thisArticle.title,
        articleId: thisArticle.id,
        value: value
      }));
    }

    const submitEmail = async (e) => {
      e.preventDefault();
      console.log(e.target)
      setSuccess(true)

      // console.log({ mailerState });
      // const response = await axios.post("https://todayifeel-server.herokuapp.com/send", { mailerState })
      // const resData = await response
      // // console.log(resData.data.status)
      // if(resData.data.status === "success") {
      //   alert("Message sent")
        
      // } else if(resData.data.status === "Fail") {
      //   alert("Message failed to sent")
      // }
      // setMailerState({
      //   message: "",
      //   value:"",
      //   articleTitle: thisArticle.title,
      //   articleId: thisArticle.id
      // });
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
            <Container p="0" maxW={"700px"} >
              <Box
                bg={bg} 
                color={color}
                borderRadius="12px"
                p={8}
                marginBottom="2rem"
                >
                <Heading color={color} as="h1" size="2xl"  textAlign="center">{thisArticle.title}</Heading>
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
                  <Stack gap={"1rem"} direction={"column"}  className="report info__holder">
                  <Box className='report'>
                    <Heading 
                        as="h4"
                        color="blue.300"
                        size={"lg"}
                        // fontFamily={"Work Sans"} 
                        fontStyle={"italic"}
                        // fontWeight="500!important"
                        textAlign={"center"}
                        m={"2rem 0 1rem"}
                        >Something is not correct or inproper? Let us know.</Heading>
                      <FormControl isRequired>
                        <form className="report" onSubmit={submitEmail}>
                        <p className={`success ${success ? "show" : "hide"}`}>Thank you for helping us! 💙</p>
                          <fieldset>
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
                              placeholder="Type a message ..."
                              fontWeight={"normal"}
                              color={formColor}
                              _placeholder={{color: "blue.300"}}
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
                                pointerEvents={"none"} 
                                cursor={"default"}
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
                  </Box>
                    <Box
                        className="info__holder"
                      >
                        <Flex 
                          className="info__content"
                          bg={bg} 
                          color={fontColor}
                          borderRadius="12px"
                          boxShadow={"lg"}
                          p={6}
                          >
                          <BiRightArrowAlt />
                          <Heading 
                            as="h5" 
                            size={"md"} 
                            fontFamily={"Work Sans"}
                            fontStyle={"normal"}
                            >Instahelp – professional online psychological counseling <strong><a href="https://instahelp.me/de/" target="_blank" className="info__link">instahelp.me/de/</a></strong></Heading>
                        </Flex>
                    </Box> 
                  </Stack>

            </Container>
        </article>
    </>
  )
}
}

export default SingleArticle