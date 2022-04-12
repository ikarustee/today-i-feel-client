import React from 'react'
import { 
    Box,
    Flex,
    Container,
    Heading,
    Stack,
    useColorModeValue
} 
from '@chakra-ui/react'

const About = () => {

  return (
    <Container id="about" maxWidth={"800px"}>
        <Box
            bg={useColorModeValue("blue.300", "blue.900" )} 
            borderRadius="12px"
            p={8}
            m={"2rem 0 0"}
            >
            <Heading 
            as="h1"
            size="2xl" 
            color={useColorModeValue('white', 'gray.300')}
            m={"2rem 0"} 
            textAlign={"center"}
            >About</Heading>
        </Box>
        <Stack>
            <Box className="col-12" m={"0 auto"}>
                <Heading 
                    as="h2"
                    className="teaser col-12"
                    color="blue.300"
                    m={"3rem 0 0.75rem"} 
                    textAlign={"center"}
                >»Emotional Intelligence Is Learnable«</Heading>
                <Heading 
                    as="h4"
                    className="col-8"
                    fontFamily={"Work Sans"}
                    lineHeight={"1.35"} 
                    size="md"
                    textAlign={"center"}
                >Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.</Heading>
            </Box>
        </Stack>
            <Flex className="col-12" margin="6rem 0" gap="1rem" flexWrap={{base: "wrap", md: "nowrap"}} >
                <Box flexBasis={{base: "100%", md: "33.3333%"}} m={"0 auto"}>
                    <Heading as="h3" size="md">Aenean vulputate eleifend tellus.</Heading>
                    <p>Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. </p>
                </Box>
                <Box className="bg__morph" flexBasis={{base: "100%", md: "50%"}}></Box>
            </Flex>
    </Container>
  )
}

export default About