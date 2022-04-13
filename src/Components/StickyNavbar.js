import React, {useState, useEffect} from 'react'
import { Stack, useColorModeValue } from '@chakra-ui/react'
import { BiArrowBack, BiHomeHeart, BiListUl, BiLogOutCircle, BiGridAlt, BiCoffee } from "react-icons/bi";
import {Link, useNavigate, useLocation} from "react-router-dom";
import axios from 'axios';

const StickyNavbar = () => {
    const [selectedPage, setSelectedPage] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    let newLoc = location.pathname.split("/").pop()

    const handleBack = (e) => {
      e.preventDefault()
      navigate(-1)
    }

    function logoutUser(){
      let url = "https://todayifeel-server.herokuapp.com/logout"
      axios.get(url,{withCredentials:true}).then((response)=> {
          navigate("/");
        })
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
    >
      {location.pathname === "/" ? (null) : ( <a className="link" href="#" onClick={handleBack}><BiArrowBack/>Back</a>)}
      <Link to="/" className="link"><BiHomeHeart/>Home</Link>
      <Link to="/articles" className="link"><BiListUl/>Articles</Link>
      <Link to='/about' className="link"><BiCoffee/>About</Link>
      {location.pathname === "/adminDashboard" 
      || location.pathname === "/newarticle"
      || location.pathname === "/editarticles"
      || location.pathname === `/editarticles/${newLoc}` ? ( <Link className="link" to="/adminDashboard" ><BiGridAlt/>Dashboard</Link>) : (null)
      || location.pathname === "/reportedarticles"
      || location.pathname === `/reportedarticles/${newLoc}` ? ( <Link className="link" to="/adminDashboard" ><BiGridAlt/>Dashboard</Link>) : (null)
      }
      {location.pathname === "/adminDashboard" 
      || location.pathname === "/newarticle"
      || location.pathname === "/editarticles"
      || location.pathname === `/editarticles/${newLoc}` ? ( <Link className="link" to="#" onClick={logoutUser}><BiLogOutCircle/>Logout</Link>) : (null)
      || location.pathname === "/reportedarticles"
      || location.pathname === `/reportedarticles/${newLoc}` ? ( <Link className="link" to="#" onClick={logoutUser}><BiLogOutCircle/>Logout</Link>) : (null)
      }
    </Stack>
  )
}

export default StickyNavbar