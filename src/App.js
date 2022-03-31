import './App.css';
import "./fonts.css"
import { Routes, Route, Link } from "react-router-dom";
import {Container, useColorMode} from "@chakra-ui/react"
import Home from "./Components/Home"
import ArticleList from './Components/ArticleList';
import SingleArticle from './Components/SingleArticle';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Footer from "./Components/Footer"


function App() {


  return (
    <div className="App">
      <Container maxW='1100px' centerContent>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:id" element={<SingleArticle />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </main>
      </Container>
      <Footer />
    </div>
  );
}

export default App;

// <img src={logoLight} alt="" />
