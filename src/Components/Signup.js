import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
  } from '@chakra-ui/react';
  import axios from 'axios';
import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
 
  export default function SimpleCard() {
    const navigate = useNavigate();
    const [active, setActive] = useState(false)
    
    async function signupUser(){
      document.getElementById("emailError").value = "";
      document.getElementById("passwordError").value = "";
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      let url = "https://todayifeel-server.herokuapp.com/user"
      let response = await axios.post(url,{email:email,password:password},{withCredentials:true});
      let data = response.data;
      if(data.errors){
        console.log(data.errors)
        document.getElementById("emailError").innerHTML = data.errors.email;
        document.getElementById("passwordError").innerHTML = data.errors.password;
      } else {
        navigate("/adminDashboard");
      }
    }
    return (
      <Flex
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={6} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Create your new Account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" />
                <FormLabel id="emailError" className='errorMessage'></FormLabel>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" />
                <FormLabel id="passwordError" className='errorMessage'></FormLabel>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                </Stack>
                  <Button
                  bg={`${active ? "white" : "gray.300"}`}
                  color={`${active ? "blue.400" : "gray.500"}`}
                  border={`${active ? "2px solid #5C90FF" : "gray.500"}`}
                  fontWeight="300"
                  _hover={{bg: 'blue.300', color: "white", border: "2px solid #5C90FF"}}
                  _focus={{border: "2px #85abff solid"}}
                   onClick={signupUser}>
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }