import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation, useSearchParams, createSearchParams } from "react-router-dom";
import axios from "axios";
import Search from './Search';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Input,
  Heading,
} from '@chakra-ui/react';
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";

// let tags = [
//   { 
//     value: 'happy', 
//     count: 78,
//     isActive: false
//    },
//   { 
//     value: 'sad', 
//     count: 60,
//     isActive: false
//    },
//   { 
//     value: 'sleepy', 
//     count: 48,
//     isActive: false
//    },
//   { 
//     value: 'stressed', 
//     count: 45,
//     isActive: false
//    },
//   { 
//     value: 'frustrated', 
//     count: 33,
//     isActive: false
//    },
//   { 
//     value: 'annoyed', 
//     count: 18
//    },
//   { 
//     value: 'tense', 
//     count: 10
//    },
//   { 
//     value: 'irritated', 
//     count: 5
//    },
//   { 
//     value: 'calm', 
//     count: 25
//    },
//   { 
//     value: 'lonely', 
//     count: 4
//    },
//   { 
//     value: 'surprised', 
//     count: 20
//    },
//   { 
//     value: 'bothered', 
//     count: 8
//    },
//   { 
//     value: 'tired', 
//     count: 30
//    },
//   { 
//     value: 'angry', 
//     count: 10
//    },
//   { 
//     value: 'hangry', 
//     count: 50
//    },
//   { 
//     value: 'buoyant', 
//     count: 30
//    },
//   { 
//     value: 'cheerful', 
//     count: 30
//    },
//   { 
//     value: 'grouchy', 
//     count: 30
//    },
//   { 
//     value: 'blessed', 
//     count: 30
//    },
//   { 
//     value: 'blah', 
//     count: 30
//    },
// ]


const Home = (props) => {
  const [startSlice , setStartSlice] = useState(0);
  const [initialTags , setInitialTags] = useState(5);
  const [increaseTags, setIncreaseTags] = useState(3);
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
  // const location = useLocation();

  async function getTagsFromDB() {
    const url = "https://todayifeel-server.herokuapp.com/tags"
    try {
      const response = await axios.get(url)
      const tagsDB = response.data
      // console.log(tagsDB)
      setData(tagsDB)
    } catch (error) {
      console.log(error)
    }
  }
//   async function getSearchResult(){
//     // setIsLoading(true);
    
//     // setIsLoading(false);
//     // setTagURL(url)
// }
  useEffect(() => {
    getTagsFromDB()
    console.log(initialTags)
    if(data.length) return setIsLoading(false)
    // setData(tags.slice(0, initialTags));
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
    //  console.log(JSON.stringify(newSearchParams).length)
     if(JSON.stringify(newSearchParams).length > 2){
      let arr = newSearchParams.unshift("vote")
      console.log(arr)
      setNewSearchParams(arr)
      setSearchParams(newSearchParams.join(" ,"))
      console.log(searchParams)
      // encodeURI(searchParams)
      
      let url = "https://todayifeel-server.herokuapp.com/search/"+newSearchParams;
      let response = await axios.get(url,{withCredentials:true});
      console.log(response.data);
      if( typeof response.data === "string"){
        alert(response.data)
        for(let i = 1; i< newSearchParams.length;i++){
          console.log(newSearchParams[i])
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
    <>  
        <div className="title">
          <Heading as='h1' className="teaser linear-wipe" textAlign={[ 'center', 'center' ]} color='blue.300' >Share your mood.<br /> Take a deep breath. <br />Take your time.</Heading>
          <h4 className="heading--center">Click on one feeling and share it <strong>anonymously</strong> with others</h4>
        </div>
        {isLoading ? (
            <DotLoader color={color} css={override} loading={isLoading} size={60}  />
        ) : (
          <div className="tagcloud">
          <form id="tagcloud">
            {data.map((t, index) => {
              const colors = ["#E020CF", "#FF3292", "#FF7E5F", "#FFC14B", "#fee700", "#F9F871", "#9BDE7E", "#C0BC84", "#C3FCF1", "#154FA6", "#5A57AB"]
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
    </> 
  )
}

export default Home

