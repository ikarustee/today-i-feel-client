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
  import { useNavigate } from 'react-router-dom';
import { Label } from 'recharts';
  
  export default function SimpleCard() {
    const navigate = useNavigate();
    async function signupUser(){
      document.getElementById("emailError").value = "";
      document.getElementById("passwordError").value = "";
      const email = document.getElementById("email").value;
      console.log(email)
      const password = document.getElementById("password").value;
      console.log(password)
      let url = "http://localhost:3010/user"
      let response = await axios.post(url,{email:email,password:password},{withCredentials:true});
      let data = response.data;
      if(data.errors){
        console.log(data.errors)
        document.getElementById("emailError").innerHTML = data.errors.email;
        document.getElementById("passwordError").innerHTML = data.errors.password;
      } else {
        navigate("/adminDashboard");
      }
      
      console.log(response)
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
                  {/* <Checkbox>Remember me</Checkbox> */}
                  {/* <Link color={'blue.400'} href={"/signin"}>Create a new Account?</Link> */}
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }} onClick={signupUser}>
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }