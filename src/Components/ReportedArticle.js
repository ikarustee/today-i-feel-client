import {
    Flex,
    Box,
    FormControl,
    Input,
    Textarea,
    Stack,
    Button,
    Heading,
    useColorMode
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
    const thisArticle = articles.find((a) => a.id === id)
    const [visible, setVisible] = useState(true)
    const { colorMode, toggleColorMode } = useColorMode()
    const [userInput, setUserInput] = useState({
      title: "",
      body: "",
      tags: "",
      url: "",
      visible:true
    })
    const [color, setColor] = useState("#5C90FF");
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
   
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
        })
      }
    }
    
    function updateArticle () {
      const {title, body, tags, url} = userInput
      let tagArray = tags.split(",")
      tagArray = tagArray.map(el=>el.trim())
      let server = "https://todayifeel-server.herokuapp.com/articles/"+id.toString()
      axios.put(server,{title:title,body:body, tags:tagArray, url:url}).then((response)=> {
            getArticles();
          })
    }
    function deleteReport(index){
      let array = thisArticle.reports;
      array.splice(index,1)
      let server = "https://todayifeel-server.herokuapp.com/articles/"+id.toString()
      axios.put(server,{...thisArticle,report:array}).then((response)=>{
        getArticles();
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
      verifyTest();
      getArticles();
    },[])
    useEffect(()=>{
        if(thisArticle){
            setUserInput({
              title: thisArticle.title,
              body: thisArticle.body,
              tags: thisArticle.tags.join(", "),
              url: thisArticle.url,
              visible: thisArticle.visible
          })
          setVisible(thisArticle.visible)
      }
    },[thisArticle])


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
                <Heading fontSize={'2xl'} color="blue.300" m="0 0 1rem" textAlign="left">Reports:</Heading>
                <Box display="flex"
                  flexDirection={{ base: 'row', sm: 'column' }}
                  flexWrap="wrap"
                  gap="1rem"
                  >
                  {thisArticle.reports.length >=1 && thisArticle.reports.map((a,index) => {
                    
                    return (
                      
                      <Box key={index}
                        display="flex"
                        borderRadius={"8px"}
                        flexDirection='column'
                        width="100%"
                        padding={"1rem 1.5rem"}
                        // paddingLeft="15px"
                        // paddingTop="15px"
                        // margin="10px"
                        boxShadow={'lg'} 
                        bg={colorMode === "light" ? "white" : "gray.700"}
                      >
                        <Heading fontSize={'xl'} color="blue.300" marginBottom="5px"> Report:{` ${index+1}`}</Heading>
                        <Heading fontSize={'l'} color="blue.300" > Reason:</Heading>
                        <p>{a.reportReason}</p>
                        <Heading fontSize={'l'} color="blue.300" > Message:</Heading>
                        <p fontSize={'l'}>{a.reportComment}</p>
                        <Button onClick={()=>deleteReport(index)}
                        borderColor="blue.300"
                        borderWidth="2px" 
                        color="blue.300"
                        fontWeight="400"
                        height="auto"
                        marginBottom="10px"
                        marginTop="10px"
                        padding="4px 10px"
                        width="100px"
                        maxHeight="40px"
                        _hover={{bg: "blue.300", color: "white"}} 
                        variant='solid' >
                          resolved
                        </Button>
                      </Box>
                    )
                  })}
                  </Box>
                
                <Box className="edit__title__meta">
                <Box className="meta" display="flex" alignItems="center">
                    <Heading fontSize={'2xl'} color="blue.300" m="0 " textAlign="left">article:</Heading>
                    <Button className="reported" onClick={toggleVisible} borderColor="blue.300"
                    borderWidth="2px" 
                    color="blue.300"
                    fontWeight="400"
                    height="28.8px"
                    marginLeft= "20px"
                    padding="4px 10px"
                    width="28.8px"
                    _hover={{bg: "blue.300", color: "white"}} 
                    variant='solid' >{thisArticle.visible ? (<RiEyeLine className="visible" />) : (<RiEyeCloseLine className="visible not" />)}</Button>
                  </Box>
                  </Box>
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
                <Stack display="flex" justifyContent="space-evenly" flexDirection="row">
                  <Button
                    onClick={updateArticle}
                    borderColor="blue.300"
                    borderWidth="2px" 
                    color="blue.300"
                    fontWeight="400"
                    height="40px"
                    margin-top= "0.5rem"
                    padding="4px 10px"
                    width="150px"
                    _hover={{bg: "blue.300", color: "white"}} 
                    variant='solid' 
                    >
                    update
                    </Button>             
                </Stack>
                </Stack>
            </Stack>
        </Flex> 

        )}
    </> )
}