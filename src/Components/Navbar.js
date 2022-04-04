import React, {ReactNode, useEffect, useState} from 'react'
import {Link as RouteLink, useNavigate, useLocation} from "react-router-dom";
import {useColorMode} from "@chakra-ui/react"
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Collapse
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import ThemeSwitcher from "./ThemeSwitcher"
import logoLight from "../img/logo-light@2x.png"
import logoDark from "../img/logo-dark@2x.png"

const LinksFromDOM = [
  {
    route: "/articles",
    name: "All articles"
  },
  {
    route: "/menu2",
    name: "Menu 2"
  },
  {
    route: "/menu3",
    name: "Menu 3"
  }
];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={children[0]}>{children[2]}</Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode()
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedPage, setSelectedPage] = useState()

  let location = useLocation();
  let navigate = useNavigate();
  // console.log(LinksFromDOM)

  const handleClick = (e) => {
    setCurrentPage({ current: e.key });
    setSelectedPage(currentPage)
    navigate(e.key)
  }

  useEffect(() => {
    // setSelectedPage(location.pathname);
   //  window.scrollTo({ top: 0, behavior: 'smooth' });
  },[location])

  return (
      <header>
        <Box>
        <Flex className="nav" h={16} alignItems={'center'} justifyContent={'space-between'}>
          <ThemeSwitcher />
          <HStack spacing={8} alignItems={'center'}>
            <Box className="nav__logo">
              <RouteLink to="/" className="logo">
                {colorMode === 'light' ? 
                (<img src={logoLight} alt="" width={400}/>) 
                : (<img src={logoDark} alt="" />)
                }
              </RouteLink>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
              >
              {LinksFromDOM.map((link) => (
                <NavLink key={link.route} onClick={handleClick}>{link.route} {link.name}</NavLink>
              ))}
            </HStack>
          </HStack>
          <IconButton
            className="nav__btn"
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={onToggle}
          />
        </Flex>
        <Collapse className="collapse" in={isOpen} animateOpacity>
          <Box className="mobile" pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {LinksFromDOM.map((link) => (
                <NavLink key={link.route}>{link.route} {link.name}</NavLink>
              ))}
            </Stack>
          </Box>

      </Collapse>
      </Box>
      </header>
  )
}
// <NavLink key={link} >{link.name}</NavLink>

export default Navbar
