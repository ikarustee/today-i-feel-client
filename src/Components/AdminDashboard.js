import {
    Flex,
    Box,
    Container,
    Stack,
    Button,
    Heading,
    useColorModeValue,
  } from '@chakra-ui/react';
  import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
  
  export default function SimpleCard() {
    const navigate = useNavigate();
    // const [verify, setVerify] = useState("");
    function logoutUser(){
      let url = "https://todayifeel-server.herokuapp.com/logout"
      axios.get(url,{withCredentials:true}).then((response)=> {
          navigate("/");
        console.log(response)
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
      <Container maxW={'800px'} className="admin" p="0">
      <Helmet><title>Today I Feel | Admin Dashboard</title></Helmet>  
        <Flex
        bg={useColorModeValue('gray.50', 'gray.800')}
        width="100%"
        align={'center'}
        justify={'center'}
        flexWrap={"wrap"}
        >
          <Stack align={'center'} >
            <Heading fontSize={'4xl'} m="1rem 0 2rem" >Hello Admin</Heading>
          </Stack>
            <Box
              className="admin__dashboard"
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              width="100%"
              p={8}
              alignItems={"center"}
              justifyContent={"center"}>
               <Stack 
               className="admin__sections"
               width="100%" 
               spacing={8}  
               alignContent={"flex-start"} 
               justifyContent={"center"}
               >
                  <Button
                    onClick={()=>{navigate("/newarticle")}}
                    borderColor="blue.300"
                    borderWidth="2px" 
                    color="blue.300"
                    bg={useColorModeValue("white", "gray.700")}
                    fontWeight="400"
                    height="auto"
                    padding="4px 10px"
                    width="auto"
                    _hover={{bg: "blue.300", color: "white"}} 
                    variant='solid'
                    >
                    Create New Article
                  </Button>
                  <Button
                    onClick={()=>{navigate("/editarticles")}}
                    borderColor="blue.300"
                    borderWidth="2px" 
                    color="blue.300"
                    bg={useColorModeValue("white", "gray.700")}
                    fontWeight="400"
                    height="auto"
                    padding="4px 10px"
                    width="auto"
                    _hover={{bg: "blue.300", color: "white"}} 
                    variant='solid'
                    >
                    Edit Articles
                  </Button>
                  <Button
                    onClick={()=>{navigate("/reportedarticles")}}
                    borderColor="blue.300"
                    borderWidth="2px" 
                    color="blue.300"
                    bg={useColorModeValue("white", "gray.700")}
                    fontWeight="400"
                    height="auto"
                    padding="4px 10px"
                    width="auto"
                    _hover={{bg: "blue.300", color: "white"}} 
                    variant='solid'
                    >
                    Check Reported Articles
                  </Button>
                 </Stack>
              </Box>
      </Flex>
      </Container>

    );
  }