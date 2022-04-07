import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
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
      <Flex

        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={6} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Hello Admin</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }} onClick={logoutUser}>
                  Log out
                </Button>
          </Box>
        </Stack>
      </Flex>
    );
  }