import React, {useContext, useState, useEffect} from 'react';
import { ArticleContext } from '../Contexts/ArticleContext';
import DotLoader from "react-spinners/DotLoader";

import {
  Box,
  Button,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  Container,
  VStack,
} from '@chakra-ui/react';

const ArticleList = ({p}) => {
  const {article, loading} = useContext(ArticleContext)
  const [color, setColor] = useState("#5C90FF");

  return (
    <>
    {loading ? (
     <DotLoader color={color} loading={loading} size={60} />
    ) : (
     <Container maxW={'7xl'} p="12">
      <Heading as="h1" color="blue.300">All articles</Heading>
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">

          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                borderRadius="lg"
                src={
                  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                }
                alt="some good alt text"
                objectFit="contain"
              />
            </Link>
          </Box>
          <Box className="bg--dotted" zIndex="1" width="100%" position="absolute" height="100%">
            {/* <Box
              bgGradient={useColorModeValue(
                'radial(blue.500 1px, transparent 1px)',
                'radial(blue.500 1px, transparent 1px)'
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            /> */}
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          {article.map((a) => {
              const excerpt = Object.values(a.body)
              return (
                <>
                <Heading key={a.id} marginTop="1" color="blue.300" as="h2" fontSize="2rem" lineHeight="1.1">
                  <Link key={a.id} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    {a.title}
                  </Link>
                </Heading>
                <Text
                  key={a.id}
                  className="excerpt"
                  as="p"
                  marginTop="2"
                  fontSize="md">
                  {excerpt.join("").split(" ").slice(0, 25).join(" ") + " ..."}
                </Text>
                <Link key={a.id} href={a.id} className="readmore__btn" textAlign="center"><Button key={a.id} className="readmore__btn" colorScheme='blue' variant='outline'>Read article</Button></Link>
                </>
              )
            })
            .slice(0,1)
            }
        </Box>
      </Box>
      <Heading as="h2" marginTop="5">
        Latest articles
      </Heading>
      <Divider marginTop="5" />
      <Box className="articles__list">
      {article.map((a) => {
              const excerpt = Object.values(a.body)
              return (
                <div className="single">
                <Heading key={a.id} marginTop="1" color="blue.300" as="h2" fontSize="2rem" lineHeight="1.1">
                  <Link key={a.id} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    {a.title}
                  </Link>
                </Heading>
                <Text
                  key={a.id}
                  className="excerpt"
                  as="p"
                  marginTop="2"
                  fontSize="md">
                  {excerpt.join("").split(" ").slice(0, 25).join(" ") + " ..."}
                </Text>
                <Link key={a.id} href={`/articles/${a.id}`} className="readmore__btn" textAlign="center"><Button className="readmore__btn" colorScheme='blue' variant='outline'>Read article</Button></Link>
                </div>
              )
            })
            }
        </Box>
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">What we write about</Heading>
        <Text
          className="excerpt" as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text
          className="excerpt" as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text
          className="excerpt" as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
      </VStack>
    </Container>
    )}
    </>
  );
};

export default ArticleList;