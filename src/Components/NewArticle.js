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
  import { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  

  export default function NewArticle() {
    const [userInput, setUserInput] = useState({
      title: "",
      body: "",
      tags: "",
      url: ""
    })

    // const [error, setError] = useState(null)
    let error = userInput.title.length >= 2
    let error2 = userInput.body >= 2
    let error3 = userInput.tags >= 2
    

    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
      setUserInput({
        ...userInput,
        [e.target.name]: e.target.value
      })
    }
    
    function handleNewArticle () {
      const {title, body, tags, url} = userInput
      let tagArray = tags.split(",")
      tagArray = tagArray.map(el=>el.trim())
      console.log(title,tagArray)
    
      let server = "https://todayifeel-server.herokuapp.com/articles"
      axios.post(server,{title:title,body:body, tags:tagArray, url:url}).then((response)=> {
            console.log(response)
            navigate("/adminDashboard")
          })
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
      
    },[])
    return (
      <Flex
        className="formholder"
        align={'center'}
        justify={'center'}
        >
        <Stack width="85%" spacing={8} mx={'auto'} py={6} px={6} maxWidth="600px">
          <Box
            maxW="1100px"
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack align={'base'}>
              <Heading fontSize={'2xl'} color="blue.300" m="0 0 2rem" textAlign="left">New article</Heading>
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
                {!error ? (
                  <FormHelperText>Enter title</FormHelperText>
                ) : (
                  <FormErrorMessage>Required</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="body" isRequired>
                <Textarea
                    onChange={handleChange}
                    name="body"
                    value={userInput.body}
                    placeholder="Text"
                    size='sm'
                    fontWeight="300"
                />
                {!error2 ? (
                  <FormHelperText>Enter some text</FormHelperText>
                ) : (
                  <FormErrorMessage>Required</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="tags" isRequired>
                <Input
                    onChange={handleChange}
                    name="tags"
                    value={userInput.tags}
                    placeholder="e.g. 'sad, tired'"
                    size='sm'
                    fontWeight="300"
                />
                {!error3 ? (
                  <FormHelperText>Enter at least one tag</FormHelperText>
                ) : (
                  <FormErrorMessage>Required</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="url">
                <Input
                    onChange={handleChange}
                    name="url"
                    value={userInput.url}
                    placeholder="'https://someurl.com'"
                    size='sm'
                    fontWeight="300"
                />
              </FormControl>
              <Stack spacing={10}>
              {!error ? (
                <Button
                  // onClick={handleNewArticle}
                  borderColor="gray.400"
                  borderWidth="2px" 
                  color="gray.400"
                  bg="gray.200"
                  fontWeight="400"
                  height="auto"
                  margin="0 auto"
                  padding="4px 10px"
                  width="150px"
                  // _hover={{bg: "white", color: "blue.300", border: "2px solid #5C90FF"}} 
                  variant='solid' 
                  >
                  Publish
                </Button>
              ) : (
                <Button
                  onClick={handleNewArticle}
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
                  Publish
                </Button>

              )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }