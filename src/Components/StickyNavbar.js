import React, {useState, useEffect} from 'react'
import { Stack, Link, useColorModeValue } from '@chakra-ui/react'
import { BiArrowBack, BiHomeHeart, BiListUl, BiLogOutCircle, BiGridAlt } from "react-icons/bi";
import {Link as RouteLink, useNavigate, useLocation} from "react-router-dom";


const StickyNavbar = () => {
    const [selectedPage, setSelectedPage] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    console.log(selectedPage)

    const handleBack = (e) => {
      e.preventDefault()
      navigate(-2)
    }
  
    useEffect(() => {
      setSelectedPage(location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },[location])

  return (
    <Stack 
    padding="1rem"
    className="footer__links"
    w='100%' 
    direction={'row'} 
    spacing={2}
    color={useColorModeValue('blue.400', 'white')} 
    // gap="1rem"
    >
      {location.pathname === "/" ? (null) : ( <a className="link" href="#" onClick={handleBack}><BiArrowBack/>Back</a>)}
      {location.pathname === "/adminDashboard" 
      || location.pathname === "/newarticle"
      || location.pathname === "/editarticles" ? ( <a className="link" href="/adminDashboard" ><BiGridAlt/>Dashboard</a>) : (null)}
      <Link textAlign="center" m="0" href={"/"} className="link"><BiHomeHeart/>Home</Link>
      <Link textAlign="center" m="0" href={"/articles"} className="link"><BiListUl/>Articles</Link>
      {location.pathname === "/adminDashboard" 
      || location.pathname === "/newarticle"
      || location.pathname === "/editarticles" ? ( <a className="link" href="#" onClick={handleBack}><BiLogOutCircle/>Logout</a>) : (null)}
    </Stack>
  )
}

export default StickyNavbar