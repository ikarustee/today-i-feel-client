import React from 'react'
import {useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  Input,
} from '@chakra-ui/react';



const Search = () => {
    const navigate = useNavigate(); 
    
    const handleSearch = (event) => {
        event.preventDefault()
        if(!event.target.tag.value) {
            return alert("Please enter a word")
        } else {
            navigate({
              pathname: '/search',
              search: `q=${encodeURI("search,"+event.target.tag.value)}`,
            })
            event.target.tag.value = "";
          }
        }

  return (
    <>
        <div className="tagsearch">
        <FormControl>
          <h4 className="heading--center">Or search for other mental health terms that interest you</h4>
          <form id="search" onSubmit={handleSearch}>
            <Input 
              id='text' 
              type='text' 
              name="tag" 
              placeholder="Search for e.g. 'tired, stressed'"
              fontWeight="400"
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
        <div>
    </div>
      </div>
    </>
  )
}

export default Search