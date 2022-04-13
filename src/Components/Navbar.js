import React, {useEffect, useState} from 'react'
import {Link as RouteLink, useNavigate, useLocation} from "react-router-dom";
import {useColorMode} from "@chakra-ui/react"
import {
  Box,
  Hide,
  Show,
} from '@chakra-ui/react';
import StickyNavbar from "./StickyNavbar";
import ThemeSwitcher from "./ThemeSwitcher"
import NavSearch from './NavSearch';
import logoLight from "../img/logo-light@2x.png"
import logoDark from "../img/logo-dark@2x.png"

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [openClose, setOpenClose] = useState(false)

  const openToggle = () => {
    setOpenClose((prev) => !prev)
  }

  let location = useLocation();
  let navigate = useNavigate();

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
      setOpenClose(false)
    }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[location])

  return (
    <>
      <header>
        <Hide above="992px">
          <Box 
          className="navbar" 
          width="100%"
          >
          <NavSearch open={openToggle} openClose={openClose} handleSearch={handleSearch} />
            <Box className="nav__logo">
              <RouteLink to="/" className="logo">
                {colorMode === 'light' ? 
                (<img src={logoLight} alt="" width={400}/>) 
                : (<img src={logoDark} alt="" />)
                }
              </RouteLink>
            </Box>
          <ThemeSwitcher />
          </Box>
        </Hide>
        <Show above='992px'>
        <Box 
          className="navbar" 
          width="100%"
          >
          <NavSearch open={openToggle} openClose={openClose} handleSearch={handleSearch} />
          <StickyNavbar />
          <ThemeSwitcher />
          </Box>
        </Show>
      </header>
      </>
  )
}

export default Navbar
