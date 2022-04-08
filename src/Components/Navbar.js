import React, {ReactNode, useEffect, useState} from 'react'
import {Link as RouteLink, useNavigate, useLocation} from "react-router-dom";
import {useColorMode} from "@chakra-ui/react"
import {
  Box,
  Button,
  FormControl,
  Input,
  Flex,
  Stack,
  Link,
  useDisclosure,
  useColorModeValue,
  Hide,
  Show,
  Slide,
  Menu,
  MenuItem,
  MenuButton,
  MenuList
} from '@chakra-ui/react';
import StickyNav from './StickyNav';
import ThemeSwitcher from "./ThemeSwitcher"
import { CloseIcon } from '@chakra-ui/icons'
import logoLight from "../img/logo-light@2x.png"
import logoDark from "../img/logo-dark@2x.png"
import { BiSearchAlt2 } from "react-icons/bi";
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
          <button onClick={onToggle} className="navsearch"><BiSearchAlt2 color="#5C90FF" /></button>
          <Slide className="navslide" direction='left' in={isOpen} style={{ zIndex: 10}}>
            <FormControl>
              <form id="navsearch" onSubmit={handleSearch}>
                <a onClick={onToggle} className="navsearch"><CloseIcon /></a>
                <Input 
                  id='text' 
                  type='text' 
                  name="tag" 
                  placeholder="Search for e.g. tired"
                  fontWeight="300"
                  borderColor={"blue.300"}
                  focusBorderColor={"blue.300"}
                  />
              </form>
            </FormControl>
          </Slide>
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
          <button onClick={onToggle} className="navsearch"><BiSearchAlt2 color="#5C90FF" /></button>
          <Slide className="navslide" direction='left' in={isOpen} style={{ zIndex: 10}}>
            <FormControl>
                <a onClick={onToggle} className="navsearch"><CloseIcon /></a>
              <form id="navsearch" onSubmit={handleSearch}>
                <Input 
                  id='text' 
                  type='text' 
                  name="tag" 
                  placeholder="Search for e.g. tired"
                  fontWeight="300"
                  borderColor={"blue.300"}
                  focusBorderColor={"blue.300"}
                  />
              </form>
            </FormControl>
          </Slide>
          <Stack 
            padding="1rem"
            className="footer__links"
            w='100%' 
            direction={'row'} 
            justify={'flex-start'}
            spacing={2}
            color={useColorModeValue('blue.400', 'white')} 
            >
              {location.pathname === "/" ? (null) : ( <a href="#" onClick={handleBack}><BiArrowBack/>Back</a>)}
              <Link textAlign="center" m="0" href={"/"} className="link"><BiHomeHeart/>Home</Link>
              <Link textAlign="center" m="0" href={"/articles"} className="link"><BiListUl/>Articles</Link>
            </Stack>
          <ThemeSwitcher />
          </Box>
        </Show>
      </header>
      </>
  )
}
// <NavLink key={link} >{link.name}</NavLink>

export default Navbar
