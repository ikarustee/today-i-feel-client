import React, {useState, useEffect} from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Heading,
} from '@chakra-ui/react';
import { TagCloud } from 'react-tagcloud'

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
  const [initialTags, setInitialTags] = useState(5);
  const [increaseTags, setIncreaseTags] = useState(5);
  const [countTags, setCountTags] = useState(0);
  // const [tagClass, setTagClass] = useState("")
  const [collectedTags, setCollectedTags] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [data, setData] = useState([]);
  const [singleTag, setSingleTag] = useState()
  // const [userInput, setUserInput] = useState("")


  const handleSearch = (event) => {
    event.preventDefault()
    const word = event.target.tag.value
    console.log(word)
    if(!word) {
      return alert("Please enter a word")
    } else {
      event.target.tag.value = ""
    }
  }

  useEffect(() => {
    setData(tags.slice(0, initialTags));
    // console.log(tags[0])
    // console.log(tags.length === 2);
    // console.log(totalTags);
  }, []);

  const handleShowmore = () => {
    setInitialTags((prev) => prev + increaseTags);
    let counter = initialTags + increaseTags;
    setData(tags.slice(0, counter));
  };

  // const processTags = (tag) => {
  //   const value = tag.value
  //   let count = tag.count
  //   let isActive = tag.isActive
  //   console.log(tag)

  //   const selectedTag = {value, count: count, isActive}
  //   const newData = data.map((t) => {
  //     if (t.value === tag.value) {
  //       setCountTags((prev) => prev + 1)
  //       selectedTag.count += 1
  //       selectedTag.isActive = true
  //       // if(!collectedTags.filter(selectedTag)) {
  //       //   let arr = collectedTags
  //       //   setCollectedTags()
  //       // }
  //       setCollectedTags((prev) => [...prev, selectedTag.value])
  //     } else if(!t.isActive === tag.isActive) {
  //       selectedTag.isActive = false
  //     }
  //     return t
  //   })
  //   setData(newData)
  //   console.log(collectedTags)
  //   console.log(selectedTag, selectedTag.count, selectedTag.isActive, countTags)
    
  // }

  const processTags = (e) => {
    console.log(e.target)
    const myElement = e.target
    const checked = e.target.checked
    console.log(myElement.name, checked)
    if(myElement.name === data.value) {
    }
    // const value = e.value
    // let count = e.target.attributes.count.value
    // let isActive = e.isActive
    // console.log(e.target.attributes.count.value)
    // console.log(e.target.attributes.value.value)
    // console.log(e.target.classList.value)
    // console.log(e.target.className)
    // const selectedTag = {value, count, isActive}
    // let myTarget = data.map((t) => {
    //   if(t.value === e.target.attributes.value.value) {
    //     selectedTag.isActive = true
    //   }
    // })
    // console.log(myTarget)
  }

  const handleTagCollect = () => {

  }


  return (
    <>
        <Heading as='h1' className="teaser" textAlign={[ 'center', 'center' ]} color='blue.300' >Share your mood.<br /> Take a deep breath. <br />Take your time.</Heading>
        <h6 className="heading--center">Click up to 3 feelings and share them <strong>anonymously</strong> with others</h6>
        <p>Selected: {collectedTags.join(", ")} | Tag name: {singleTag} | Tag count: {countTags}</p>
          <div className="tagcloud">
          {/* <TagCloud
            className="singletag"
            minSize={16}
            maxSize={52}
            tags={data}
            onClick={(tag) => processTags(tag)}
            style={{margin: "0 auto", padding: "2rem 1rem", boxSizing: "border-box"}}
            // colorOptions={options} maybe needed
          /> */}
          <form>
          {data.map((t) => {
            return (
            <>
              <input
                  key={t.value}
                  type="checkbox"
                  onClick={(e) => processTags(e)}
                  id={t.value}
                  value={t.count}
                  name={t.value}
                  className="tag"
                  >
                  </input>
              <label
                htmlFor={t.value}
              >{t.value}
                  {/* // value={t.value}
                  // count={t.count}
                  // className={t.isActive ? "active" : "meennnooo"} 
                  // key={index}>
                  // {t.value} {t.isActive} */}
                  </label>
                  </>

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
      <FormControl>
        <form id="search" onSubmit={handleSearch}>
          <Input 
            id='text' 
            type='text' 
            name="tag" 
            placeholder="Search for e.g. tired"
            fontWeight="300"
            borderColor={"blue.300"}
            focusBorderColor={"blue.300"}
             />
          <Button 
            type="submit" 
            className="primary__btn" 
            bg={"blue.300"} 
            color={"white"} 
            fontWeight="normal"
            _hover={{ bg: "blue.500" }}
          >
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7441 10.3432C12.7125 9.02177 13.1462 7.3834 12.9585 5.75589C12.7708 4.12838 11.9755 2.63176 10.7318 1.56544C9.48799 0.49912 7.88746 -0.0582551 6.25038 0.00482458C4.6133 0.0679042 3.0604 0.746786 1.90236 1.90565C0.744326 3.06452 0.0665552 4.6179 0.00464701 6.25503C-0.0572612 7.89215 0.501259 9.49229 1.56847 10.7353C2.63568 11.9783 4.13287 12.7725 5.76051 12.9591C7.38815 13.1456 9.02621 12.7107 10.347 11.7414H10.346C10.376 11.7814 10.408 11.8194 10.444 11.8564L14.2944 15.7068C14.4819 15.8944 14.7363 15.9999 15.0016 16C15.2669 16.0001 15.5214 15.8948 15.709 15.7073C15.8967 15.5197 16.0022 15.2653 16.0022 15C16.0023 14.7348 15.897 14.4803 15.7095 14.2926L11.8591 10.4422C11.8234 10.406 11.7849 10.3726 11.7441 10.3422V10.3432ZM12.0021 6.49882C12.0021 7.22116 11.8599 7.93643 11.5834 8.60379C11.307 9.27115 10.9018 9.87753 10.3911 10.3883C9.88028 10.8991 9.2739 11.3042 8.60654 11.5807C7.93918 11.8571 7.22391 11.9994 6.50157 11.9994C5.77922 11.9994 5.06395 11.8571 4.39659 11.5807C3.72923 11.3042 3.12285 10.8991 2.61208 10.3883C2.1013 9.87753 1.69614 9.27115 1.41971 8.60379C1.14328 7.93643 1.001 7.22116 1.001 6.49882C1.001 5.03998 1.58052 3.64089 2.61208 2.60933C3.64364 1.57777 5.04273 0.99825 6.50157 0.99825C7.96041 0.99825 9.3595 1.57777 10.3911 2.60933C11.4226 3.64089 12.0021 5.03998 12.0021 6.49882Z" fill="white"/>
            </svg>
          </Button>
        </form>
      </FormControl>
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