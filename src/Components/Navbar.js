import React, {ReactNode, useEffect, useState} from 'react'
import {Link as RouteLink, useNavigate, useLocation} from "react-router-dom";
import {useColorMode} from "@chakra-ui/react"
import {
  Box,
  Link,
  useDisclosure,
  Hide,
  Show,
} from '@chakra-ui/react';
import StickyNavbar from "./StickyNavbar";
import ThemeSwitcher from "./ThemeSwitcher"
import NavSearch from './NavSearch';
import logoLight from "../img/logo-light@2x.png"
import logoDark from "../img/logo-dark@2x.png"
import { BiArrowBack, BiHomeHeart, BiListUl } from "react-icons/bi";

const NavLink = ({ children }) => (
  <Link
    className="navlink"
    transition="all 300ms ease"
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      color: "blue.300",
    }}
    _focus={{boxShadow: "none"}}
    href={children[0]}>{children[2]}</Link>
);

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [currentPage, setCurrentPage] = useState("home")
  const { isOpen, onOpen, onToggle } = useDisclosure()
  const [selectedPage, setSelectedPage] = useState()
  const [openClose, setOpenClose] = useState(false)

  const openToggle = () => {
    console.log("Hello world")
    setOpenClose((prev) => !prev)
    console.log(openClose)
  }

  let location = useLocation();
  let navigate = useNavigate();
  // console.log(LinksFromDOM)

  const handleBack = (e) => {
    e.preventDefault()
    navigate(-2)
  }


  const handleSearch = (event) => {
    event.preventDefault()
    if(!event.target.tag.value) {
        return alert("Please enter a word")
    } else {
        console.log(event.target.tag.value)
        navigate({
          pathname: '/search',
          search: `q=${encodeURI("search,"+event.target.tag.value)}`,
        })
        event.target.tag.value = "";
      }
      setOpenClose(false)
    }

  const handleClick = (e) => {
    setCurrentPage({ current: e.key });
    setSelectedPage(currentPage)
    navigate(e.key)
  }

  useEffect(() => {
    setSelectedPage(location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[location])

  return (
    <>
      <header>
        <Hide above="992px">
          <Box 
          className="navbar" 
          // position="fixed"
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
          // position="fixed"
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
// <NavLink key={link} >{link.name}</NavLink>

export default Navbar
