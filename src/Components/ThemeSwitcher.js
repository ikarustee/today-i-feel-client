import React from 'react'
import {useColorMode} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from '@chakra-ui/icons';


const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
    <a onClick={toggleColorMode} className="themeswitcher">
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </a>
    </>
  )
}

export default Navbar