import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation, useSearchParams, createSearchParams } from "react-router-dom";
import Search from './Search';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Heading,
} from '@chakra-ui/react';

let tags = [
  { 
    value: 'happy', 
    count: 78,
    isActive: false
   },
  { 
    value: 'sad', 
    count: 60,
    isActive: false
   },
  { 
    value: 'sleepy', 
    count: 48,
    isActive: false
   },
  { 
    value: 'stressed', 
    count: 45,
    isActive: false
   },
  { 
    value: 'frustrated', 
    count: 33,
    isActive: false
   },
  { 
    value: 'annoyed', 
    count: 18
   },
  { 
    value: 'tense', 
    count: 10
   },
  { 
    value: 'irritated', 
    count: 5
   },
  { 
    value: 'calm', 
    count: 25
   },
  { 
    value: 'lonely', 
    count: 4
   },
  { 
    value: 'surprised', 
    count: 20
   },
  { 
    value: 'bothered', 
    count: 8
   },
  { 
    value: 'tired', 
    count: 30
   },
  { 
    value: 'angry', 
    count: 10
   },
  { 
    value: 'hangry', 
    count: 50
   },
  { 
    value: 'buoyant', 
    count: 30
   },
  { 
    value: 'cheerful', 
    count: 30
   },
  { 
    value: 'grouchy', 
    count: 30
   },
  { 
    value: 'blessed', 
    count: 30
   },
  { 
    value: 'blah', 
    count: 30
   },
]


const Home = () => {
  const [initialTags , setInitialTags] = useState(5);
  const [increaseTags, setIncreaseTags] = useState(5);
  const [checkedTags, setCheckedTags] = useState(0)
  const [collectedTags, setCollectedTags] = useState([])
  const [newSearchParams, setNewSearchParams] = useState([]) 
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
 

  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    setData(tags.slice(0, initialTags));
    // console.log(collectedTags)
    // console.log(location)
    // console.log(tags[0])
    // console.log(tags.length === 2);
    // console.log(totalTags);
  }, []);

  const handleShowmore = () => {
    setInitialTags((prev) => prev + increaseTags);
    let counter = initialTags + increaseTags;
    setData(tags.slice(0, counter));
  };

  // const processTags = (e) => {
  //   const myTag = e.target.name
  //   const checked = e.target.checked
  //   const limitTags = 3
    

  //   if(checked) {
  //     setCollectedTags((prev) => [...prev, myTag])
  //   } else {
  //     const newTags = collectedTags.filter((item) => item.value !== myTag)
  //     setCollectedTags(newTags)
  //   }
  // }

  const processTags = (e) => {
    const myTag = e.target.name
    const count = e.target.value
    const checked = e.target.checked
    const limitTags = 3

    // console.log(myTag)
    
    if(checked) {
      if(checkedTags >= limitTags) {
        alert("You can only choose 3 moods.");
        e.target.checked = false;
      } else {
        setCollectedTags((prev) => [...prev, myTag])
        setCheckedTags((prev) => prev + 1)
        setNewSearchParams((prev) => [...prev, myTag])
        // console.log(checkedTags)
      }
    } else {
      const newTags = collectedTags.filter((item) => item !== myTag)
      setCollectedTags(newTags)
      setCheckedTags((prev) => prev - 1)
      setNewSearchParams(newSearchParams.filter((item) => item != myTag))
      // setSearchParams(myTag, myTag, myTag)
    }
  }
  // console.log(newSearchParams)
  // console.log(collectedTags)

  const handleTagCollect = () => {
    // POST function to DB
    // setSearchParams({q: newSearchParams})
    
    let arr = newSearchParams.unshift("vote")
    console.log(arr)
    setNewSearchParams(arr)
    console.log(newSearchParams)
    setSearchParams(newSearchParams.join(" ,"))
    console.log(searchParams)

    encodeURI(searchParams)
    navigate({
      pathname: '/search',
      search: `q=${encodeURI(newSearchParams)}`,
    });
  }


  
  return (
    <>  
        <div className="title">
          <Heading as='h1' className="teaser" textAlign={[ 'center', 'center' ]} color='blue.300' >Share your mood.<br /> Take a deep breath. <br />Take your time.</Heading>
          <h4 className="heading--center">Click on one feeling and share it <strong>anonymously</strong> with others</h4>
        </div>
        <div className="tagcloud">
          <form id="tagcloud">
            {data.map((t, index) => {
              const colors = ["#FFFFFF", "#E020CF", "#FF3292", "#FF7E5F", "#FFC14B", "#FFFB00", "#F9F871", "#9BDE7E", "#C0BC84", "#C3FCF1", "#154FA6", "#5A57AB"]
              const randomColor = colors[Math.floor(Math.random() * colors.length)]
              
              return (
              <span key={t.value} className="tag">  
                <input
                    type="checkbox"
                    onClick={(e) => processTags(e)}
                    id={t.value}
                    value={t.count}
                    name={t.value}
                    >
                </input>
                <label
                  htmlFor={t.value}
                  style={{color: randomColor}}
                >{t.value}
                </label>
              </span>
              )
            })}
            </form>
            <Flex className="tagcloud__btnholder" flexWrap="nowrap" justifyContent="center">
              <Button 
                onClick={handleShowmore} 
                variant='outline' 
                border='0' 
                color="white" 
                fontWeight="500" 
                borderColor='transparent'
                _hover={{ color: 'blue.700', bg: "transparent", borderColor: "transparent" }}
                >
                  Show more
                </Button>
              <Button 
                onClick={handleTagCollect} 
                variant='outline' 
                border='1px' 
                color="white" 
                fontWeight="500" 
                borderColor='#ffffff'
                _hover={{ bg: "blue.700", borderColor: "blue.300" }}
                >
                  Share
                </Button>
            </Flex>
        </div>
      <Search />
    </> 
  )
}

export default Home

// const index = tags.map(object => object.value).indexOf(tag.value);
    // console.log(tags[index])
    // if(!tags[index].isActive) {
      
      // console.log(index, clickedTag.value)
      // tags[index].isActive = true;
      // clickedTag.isActive = true;
      // setIsActive(true)
      // setCountTags((prev) => prev + 1)
      // setCountTags(countTags + 1)
      // setSingleTag(tag.value)
      // setCollectedTags((prev) => [...prev, tag.value])
    // } else {
      // console.log("Entered here")
      // tags[index].isActive = false;
      // setIsActive(false)
      // setCountTags(countTags - 1)
    // }
    // console.log(tags[index])
    
    // if(tag = !isActive) {
    //     setIsActive(true)
    //     setCountTags((prev) => prev + 1)
    //     setCollectedTags((prev) => [...prev, clickedTag])
    //   } else {
    //     setCountTags((prev) => prev - 1)
    //     setCollectedTags((prev) => [...prev.filter((tag) => tag.value === clickedTag)])
    // }
    // setSingleTag(clickedTag)
    // console.log(tags[index].value, tags[index].isActive,countTags, collectedTags)
    // if(clickedTag === isActive) {
    //   setIsActive(false)
    //   setCountTags((prev) => prev - 1)
    //   console.log("Nothing happens")
    //   console.log(selCountTags, isActive)
    // } else {
    //   setIsActive(true)
    //   setCountTags((prev) => prev + 1)
    //   console.log(selCountTags, isActive)
    // }