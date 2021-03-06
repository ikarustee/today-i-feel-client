import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Search from './Search';
import {
  Box,
  Button,
  Flex,
  Heading,
} from '@chakra-ui/react';
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";

const Home = (props) => {
  const [startSlice , setStartSlice] = useState(0);
  const [initialTags , setInitialTags] = useState(7);
  const [increaseTags, setIncreaseTags] = useState(5);
  const [checkedTags, setCheckedTags] = useState(0)
  const [collectedTags, setCollectedTags] = useState([])
  const [newSearchParams, setNewSearchParams] = useState([]) 
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true)
  const [color, setColor] = useState("#5C90FF");

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

  const navigate = useNavigate();

  async function getTagsFromDB() {
    const url = "https://todayifeel-server.herokuapp.com/tags"
    try {
      const response = await axios.get(url)
      const tagsDB = response.data
      setData(tagsDB)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTagsFromDB()
    if(data.length) return setIsLoading(false)
  }, [data.length]);

  const processTags = (e) => {
    const myTag = e.target.name
    const checked = e.target.checked
    const limitTags = 3
    
    if(checked) {
      if(checkedTags >= limitTags) {
        alert("You can only choose 3 moods.");
        e.target.checked = false;
      } else {
        setCollectedTags((prev) => [...prev, myTag])
        setCheckedTags((prev) => prev + 1)
        setNewSearchParams((prev) => [...prev, myTag])
      }
    } else {
      const newTags = collectedTags.filter((item) => item !== myTag)
      setCollectedTags(newTags)
      setCheckedTags((prev) => prev - 1)
      setNewSearchParams(newSearchParams.filter((item) => item !== myTag))
    }
  }
   const handleTagCollect = async () => {
     if(JSON.stringify(newSearchParams).length > 2){
      let arr = newSearchParams.unshift("vote")
      setNewSearchParams(arr)
      setSearchParams(newSearchParams.join(" ,"))
      let url = "https://todayifeel-server.herokuapp.com/search/"+newSearchParams;
      let response = await axios.get(url,{withCredentials:true});
      if( typeof response.data === "string"){
        alert(response.data)
        for(let i = 1; i< newSearchParams.length;i++){
          document.getElementById(newSearchParams[i]).checked = false;
        }
        setCheckedTags(0)
        setNewSearchParams([])
      } else {
        localStorage.setItem( 'votedTags', newSearchParams );
          navigate({
          pathname: '/search',
          search: `q=${encodeURI(newSearchParams)}`,
      });
      }
     }   
  }

  return (
    <div id="home">
      <Helmet><title>Today I Feel | You're not alone</title></Helmet>  
        <div className="title">
          <Box className="bg__morph home" flexBasis={{base: "100%", md: "50%"}}></Box>
          <Heading as='h1' className="teaser linear-wipe" textAlign={[ 'center', 'center' ]} color='blue.300' >Share your mood.<br /> Take a deep breath. <br />Take your time.</Heading>
          <h4 className="heading--center">Click on up to 3 feelings and share your mood <strong>anonymously</strong> with others</h4>
        </div>
        {isLoading ? (
            <DotLoader color={color} css={override} loading={isLoading} size={60}  />
        ) : (
          <div className="tagcloud">
          <form id="tagcloud">
            {data.map((t, index) => {
              const colors = ["#b110a2", "#f27bb2", "#FF7E5F", "#FFC14B", "#fee700", "#F9F871", "#9BDE7E", "#C0BC84", "#C3FCF1", "#154FA6", "#5A57AB"]
              const randomColor = colors[Math.floor(Math.random() * colors.length)]
              const fontSizes = ["1rem", "1.25rem", "1.5rem", "1.75rem"]
              const randomFontsize = fontSizes[Math.floor(Math.random() * fontSizes.length)]
              
              return (
              <span key={t.name} className="tag">  
                <input
                    type="checkbox"
                    onClick={(e) => processTags(e)}
                    id={t.name}
                    value={t.timesClicked}
                    name={t.name}
                    >
                </input>
                <label
                  htmlFor={t.name}
                  style={{color: randomColor, fontSize: randomFontsize}}
                >{t.name}
                </label>
              </span>
              )
            })
            .slice(startSlice, initialTags)
            }
            </form>
            <Flex className="tagcloud__btnholder" flexWrap="nowrap" justifyContent="center">
            {initialTags >= data.length ? (null) : (
              <Button 
                onClick={() => {setInitialTags((prev) => prev + increaseTags)}} 
                variant='outline' 
                border='0' 
                color="white" 
                fontWeight="500" 
                borderColor='transparent'
                _hover={{ color: 'blue.700', bg: "transparent", borderColor: "transparent" }}
                >
                  Show more
                </Button>
            )}
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
        )}
      <Search/>
    </div> 
  )
}

export default Home

