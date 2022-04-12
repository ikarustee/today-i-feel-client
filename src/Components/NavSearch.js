import React from 'react'
import { Input, useColorMode, Button } from '@chakra-ui/react'
import {BiSearchAlt2} from "react-icons/bi";
import { CloseIcon } from '@chakra-ui/icons'

const NavSearch = ({open, handleSearch, openClose}) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
      <>
    <button onClick={open} className={`navsearch ${openClose ? "show" : "hide"}`}>{openClose ? (<CloseIcon color="#5C90FF" />) : (<BiSearchAlt2 color="#5C90FF" />)}</button>
        <form 
        id="navsearch" 
        className={`navsearch ${openClose ? "show" : "hide"}`}
        onSubmit={handleSearch}>
            <Input
            bg={`${colorMode === "light" ? "white" : "gray.100"}`} 
            _placeholder={{color: `${colorMode === "light" ? "gray.400" : "gray.500"}`}}
            id='text' 
            type='text' 
            name="tag" 
            placeholder="Search for e.g. tired"
            fontWeight="400"
            borderColor={"blue.300"}
            focusBorderColor={"blue.300"}
            />
            <Button 
              type="submit"
              p="10px"
              bg="blue.300" 
              color="white"
              onSubmit={handleSearch}><BiSearchAlt2 /></Button>
        </form>
    </>
  )
}

export default NavSearch