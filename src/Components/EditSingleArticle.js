import {
    Flex,
    Box,
    FormControl,
     Input,
    Textarea,
    Stack,
    Button,
    Heading,
  } from '@chakra-ui/react';
  import axios from 'axios';
  import { useEffect, useState,useContext } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { ArticleContext } from '../Contexts/ArticleContext'
  import { useParams } from 'react-router-dom';
  import DotLoader from "react-spinners/DotLoader";
  import { css } from "@emotion/react";
  import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
  export default function EditSingleArticle() {
    
    const {id} = useParams()
    const {articles, isLoading, getArticles} = useContext(ArticleContext)
    const thisArticle=articles.find((a) => a.id === id)
    const [visible, setVisible] = useState(true)
    const [userInput, setUserInput] = useState({
      title: "",
      body: "",
      tags: "",
      url: ""
    })
    const [color, setColor] = useState("#5C90FF");
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
    const navigate = useNavigate();
    
    const handleChange = (e) => {
      setVisible((prev) => !prev)
      setUserInput({
        ...userInput,
        [e.target.name]: e.target.value,
        visible: visible
      })
    }
    
    function updateArticle () {
      const {title, body, tags, url, visible} = userInput
      let tagArray = tags.split(",")
      tagArray = tagArray.map(el=>el.trim())
      let server = "https://todayifeel-server.herokuapp.com/articles/"+id.toString()
      axios.put(server,{title:title,body:body, tags:tagArray, url:url, visible:visible}).then((response)=> {
             navigate("/adminDashboard")
          })
    }
    function toggleVisible(){
      let server = "https://todayifeel-server.herokuapp.com/articles/"+id.toString()
      axios.put(server,{...thisArticle,visible:!thisArticle.visible}).then((response)=> {
            getArticles();
          })
        }
    async function verifyTest(){
        let response = await axios.get("https://todayifeel-server.herokuapp.com/verify",{withCredentials:true})
          if (response.data !== "OK"){
              alert("Please Login First!")
              navigate("/login");
          }
    }
    useEffect(()=>{
      getArticles();
      verifyTest();
    },[])
    useEffect(()=>{
        
        if(thisArticle){
            setUserInput({
            title: thisArticle.title,
            body: thisArticle.body,
            tags: thisArticle.tags.join(", "),
            url: thisArticle.url,
            visible:thisArticle.visible
          }

        )}
    },[thisArticle])


    return (
        <>
        {!thisArticle ? (
            <DotLoader color={color} css={override} loading={isLoading} size={60} />
            ):(
                <Flex
                className="formholder"
                align={'center'}
                justify={'center'}
            >
            <Stack width="85%" spacing={8} mx={'auto'} py={6} px={6} maxWidth="600px">
                <Stack align={'base'}>
                <Box className="edit__title__meta">
                <Box className="meta" display="flex" alignItems="center">
                    <Heading fontSize={'2xl'} color="blue.300" m="0 " textAlign="left">Edit article:</Heading>
                    <Button className="reported" onClick={toggleVisible} borderColor="blue.300"
                    borderWidth="2px" 
                    color="blue.300"
                    // bg="white"
                    fontWeight="400"
                    height="28.8px"
                    marginLeft= "20px"
                    padding="4px 10px"
                    width="28.8px"
                    _hover={{bg: "blue.300", color: "white"}} 
                    variant='solid' >{thisArticle.visible ? (<RiEyeLine className="visible" />) : (<RiEyeCloseLine className="visible not" />)}</Button>
                  </Box>
                  </Box>
                </Stack>
                <Stack spacing={4}>
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
                <Stack spacing={10}>
                
                    <Button
                    onClick={updateArticle}
                    borderColor="blue.300"
                    borderWidth="2px" 
                    color="blue.300"
                    
                    fontWeight="400"
                    height="auto"
                    margin="0 auto"
                    padding="4px 10px"
                    width="150px"
                    _hover={{bg: "blue.300", color: "white"}} 
                    variant='solid' 
                    >
                    Update
                    </Button>

             
                </Stack>
                </Stack>
            </Stack>
        </Flex> 

        )}
    </> )
}