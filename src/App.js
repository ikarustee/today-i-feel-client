import './App.css';
import "./fonts.css"
import { Routes, Route, Link } from "react-router-dom";
import {Container, useColorMode} from "@chakra-ui/react"
import Home from "./Components/Home"
import ThemeSwitcher from "./Components/ThemeSwitcher"
import logoLight from "./img/logo-light@2x.png"
import logoDark from "./img/logo-dark@2x.png"


function App() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <div className="App">
      <Container maxW='1100px' centerContent>
      <header>
        <Link to="/" className="logo">
          {colorMode === 'light' ? 
          (<img src={logoLight} alt="" width={400}/>) 
          : (<img src={logoDark} alt="" />)
          }
        </Link>
      <ThemeSwitcher />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
        </Routes>
      </main>
      </Container>
    </div>
  );
}

export default App;

// <img src={logoLight} alt="" />
