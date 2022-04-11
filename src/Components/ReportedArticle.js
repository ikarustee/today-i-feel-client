import {
    Flex,
    Box,
    Checkbox,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Textarea,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import axios from 'axios';
  import { useEffect, useState,useContext } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { ArticleContext } from '../Contexts/ArticleContext'
  import { useParams } from 'react-router-dom';
  import { FaCommentDollar } from 'react-icons/fa';
  import DotLoader from "react-spinners/DotLoader";
  import { css } from "@emotion/react";
import ReactMarkdown from 'react-markdown';
  export default function EditSingleArticle() {
    
    const {id} = useParams()
    // const {articles, isLoading, getArticles} = useContext(ArticleContext)
    const [thisArticle, setThisArticle]= useState({})
    const [visible, setVisible] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [userInput, setUserInput] = useState({
      title: "",
      body: "",
      tags: "",
      url: "",
      visible:true
    })

    const userInputEmpty = JSON.stringify(userInput).length
    const [color, setColor] = useState("#5C90FF");
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
    async function getData(){
      setIsLoading(true);
      console.log("http://localhost:3010/reports/"+id.toString())
      let response = await axios.get("http://localhost:3010/reports/"+id.toString())
      setThisArticle(response.data[0])
      console.log(response.data[0])
      setIsLoading(false)
    }
    const navigate = useNavigate();
    
    const handleChange = (e) => {
      if(e.target.name === "visible"){
        setVisible((prev) => !prev)
        setUserInput({
          ...userInput,
          visible: visible
        })
      } else {
        setUserInput({
          ...userInput,
          [e.target.name]: e.target.value,
          // visible: visible
        })
      }
      
      
      console.log(userInput)
    }
    
    function updateArticle () {
      const {title, body, tags, url} = userInput
      console.log(userInput)
      console.log(tags)
      let tagArray = tags.split(",")
      tagArray = tagArray.map(el=>el.trim())
      console.log({title:title,body:body, tags:tagArray, url:url})
    
      let server = "https://todayifeel-server.herokuapp.com/articles/"+id.toString()
      axios.put(server,{title:title,body:body, tags:tagArray, url:url}).then((response)=> {
            console.log(response)
            deleteReport()
          }).then((response)=>{
            // navigate("/reportedarticles")
          })
    }
    function deleteReport(){
      let server = "https://todayifeel-server.herokuapp.com/reports/"+id.toString()
      axios.delete(server).then((response)=>{
        console.log(response)
        // navigate("/reportedarticles")
      })
    }
    function invisibleArticle(){
      const {title, body, tags, url} = userInput
      console.log(userInput)
      console.log(tags)
      let tagArray = tags.split(",")
      tagArray = tagArray.map(el=>el.trim())
      console.log({title:title,body:body, tags:tagArray, url:url,visible:false})    
      let server = "https://todayifeel-server.herokuapp.com/articles/"+id.toString()
      axios.put(server,{title:title,body:body, tags:tagArray, url:url,visible:false}).then((response)=> {
            console.log(response)
            // navigate("/reportedarticles")
          })
    
    }
    async function verifyTest(){
        let response = await axios.get("https://todayifeel-server.herokuapp.com/verify",{withCredentials:true})
        console.log(response.data !== "OK")
          if (response.data !== "OK"){
              alert("Please Login First!")
              navigate("/login");
          }
    }
    useEffect(()=>{
      verifyTest();
      getData();
    },[])
    useEffect(()=>{
        
        if(thisArticle && !isLoading){
          setIsLoading(true)
            console.log(thisArticle)
            setUserInput({
              title: thisArticle.article.title,
              body: thisArticle.article.body,
              tags: thisArticle.article.tags.join(", "),
              url: thisArticle.article.url,
              visible: thisArticle.article.visible
          })
          setVisible(thisArticle.article.visible)
          setIsLoading(false)
      }
    },[thisArticle, isLoading])


    return (
        <>
        {isLoading ? (
            <DotLoader color={color} css={override} loading={isLoading} size={60} />
            ):(
                <Flex
                className="formholder"
                align={'center'}
                justify={'center'}
            >
            <Stack width="85%" spacing={8} mx={'auto'} py={6} px={6} maxWidth="600px">
                <Stack align={'base'}>
                <Heading fontSize={'2xl'} color="blue.300" m="0 0 2rem" textAlign="left">Check report</Heading>
                </Stack>
                <Stack spacing={4}>
                <Heading fontSize={'2xl'} color="blue.300" m="0 0 2rem" textAlign="left">Issue:</Heading>
                  <Heading fontSize={'xl'} color="blue.300" m="0 0 2rem" textAlign="left">{thisArticle.reason}</Heading>
                  <ReactMarkdown className="article__content">{thisArticle.comment}</ReactMarkdown>
                  <Heading fontSize={'xl'} color="blue.300" m="0 0 2rem" textAlign="left">article under review:</Heading>
                <FormControl id="title" isRequired >
                    <Input
                    onChange={handleChange} 
                    type="text" 
                    name="title" 
                    value={userInput.title} 
                    placeholder="Title" 
                    />
                </FormControl>
                <FormControl id="body" isRequired>
                  <Textarea
                      onChange={handleChange}
                      name="body"
                      value={userInput.body}
                      placeholder="Text"
                      size='sm'
                      fontWeight="400"
                  />
                </FormControl>
                <FormControl id="tags" isRequired>
                    <Input
                        onChange={handleChange}
                        name="tags"
                        value={userInput.tags}
                        placeholder="e.g. 'sad, tired'"
                        size='sm'
                        fontWeight="400"
                    />
                </FormControl>
                <FormControl id="url">
                  <Input
                      onChange={handleChange}
                      name="url"
                      value={userInput.url}
                      placeholder="'https://someurl.com'"
                      size='sm'
                      fontWeight="400"
                  />
                </FormControl>
                <FormControl>
                  <Checkbox
                    id="visible"
                    name="visible"
                    value={userInput.visible}
                    size='lg'
                    onChange={handleChange}
                    isChecked={visible}
                    // checked={userInput.visible}
                  />
                  <label htmlFor="visible">Visible</label>
                </FormControl>
                <Stack spacing={10}>
                
                    <Button
                    onClick={updateArticle}
                    borderColor="blue.300"
                    borderWidth="2px" 
                    color="blue.300"
                    bg="white"
                    fontWeight="400"
                    height="auto"
                    margin="0 auto"
                    padding="4px 10px"
                    width="150px"
                    _hover={{bg: "blue.300", color: "white"}} 
                    variant='solid' 
                    >
                    Article changed and Report closed
                    </Button>
                    <Button
                    onClick={deleteReport}
                    borderColor="blue.300"
                    borderWidth="2px" 
                    color="blue.300"
                    bg="white"
                    fontWeight="400"
                    height="auto"
                    margin="0 auto"
                    padding="4px 10px"
                    width="150px"
                    _hover={{bg: "blue.300", color: "white"}} 
                    variant='solid' 
                    >
                    Report dismissed
                    </Button>
                    <Button
                    onClick={invisibleArticle}
                    borderColor="blue.300"
                    borderWidth="2px" 
                    color="blue.300"
                    bg="white"
                    fontWeight="400"
                    height="auto"
                    margin="0 auto"
                    padding="4px 10px"
                    width="150px"
                    _hover={{bg: "blue.300", color: "white"}} 
                    variant='solid' 
                    >
                    Article temporarly made invisible
                    </Button>

             
                </Stack>
                </Stack>
            </Stack>
        </Flex> 

        )}
    </> )
// }
}