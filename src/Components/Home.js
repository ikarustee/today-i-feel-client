import React, {useState, useEffect} from 'react'
import {Button, Heading } from '@chakra-ui/react'
import { TagCloud } from 'react-tagcloud'

const Home = () => {
  const [initialTags, setInitialTags] = useState(3);
  const [increaseTags, setIncreaseTags] = useState(5);
  const [totalTags, setTotalTags] = useState(0);
  const [data, setData] = useState([]);

  const tags = [
    { value: 'happy', count: 78 },
    { value: 'sad', count: 60 },
    { value: 'sleepy', count: 48 },
    { value: 'stressed', count: 45 },
    { value: 'frustrated', count: 33 },
    { value: 'annoyed', count: 18 },
    { value: 'tense', count: 10 },
    { value: 'irritated', count: 5 },
    { value: 'calm', count: 25 },
    { value: 'lonely', count: 4 },
    { value: 'surprised', count: 20 },
    { value: 'bothered', count: 8 },
    { value: 'tired', count: 30 },
    { value: 'angry', count: 10 },
    { value: 'hangry', count: 50 },
    { value: 'buoyant', count: 30 },
    { value: 'cheerful', count: 30 },
    { value: 'grouchy', count: 30 },
    { value: 'blessed', count: 30 },
    { value: 'blah', count: 30 },
  ]

  useEffect(() => {
    setData(tags.slice(0, initialTags));
    // console.log(tags.length === 2);
    // console.log(totalTags);
  }, []);

  const handleShowmore = () => {
    setInitialTags((prev) => prev + increaseTags);
    let counter = initialTags + increaseTags;
    setData(tags.slice(0, counter));
  };

  return (
    <>
        <Heading as='h1' className="teaser" textAlign={[ 'center', 'center' ]} color='blue.300' >Share your mood.<br /> Take a deep breath. <br />Take your time.</Heading>
        <p>THis is the wrong tonf</p>
          <div className="tagcloud">
          <TagCloud
            minSize={16}
            maxSize={52}
            tags={data}
            onClick={tag => alert(`'${tag.value}' was selected!`)}
            style={{margin: "0 auto", padding: "2rem 1rem", boxSizing: "border-box"}}
            // colorOptions={options} maybe needed
          />
          <Button 
            onClick={handleShowmore} 
            variant='outline' 
            border='1px' 
            color="white" 
            fontWeight="500" 
            borderColor='#ffffff'
            _hover={{ color: 'blue.300', bg: "white", borderColor: "blue.300" }}
            >
            Show more
            </Button>
      </div>
    </> 
  )
}

export default Home