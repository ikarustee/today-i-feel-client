import React, {ReactNode} from 'react'
import {Link as RouteLink} from "react-router-dom";
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
  Fade, ScaleFade, Slide, SlideFade, Collapse
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import ArticleList from './ArticleList';
import ThemeSwitcher from "./ThemeSwitcher"
import logoLight from "../img/logo-light@2x.png"
import logoDark from "../img/logo-dark@2x.png"

const Links = ['/articles', 'About', 'Contact'];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={children}>{children}</Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode()

  return (
      <header>
        <Box>
        <Flex className="nav" h={16} alignItems={'center'} justifyContent={'space-between'}>
          <ThemeSwitcher />
          {/* <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          /> */}
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
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
        <Collapse in={isOpen} animateOpacity>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link} >{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}

      </Collapse>
      </Box>
      </header>
  )
}


export default Navbar
