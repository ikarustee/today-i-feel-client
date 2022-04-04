import './App.css';
import "./fonts.css"
import { Routes, Route, Link, useSearchParams, createSearchParams } from "react-router-dom";
import {Container, useColorMode} from "@chakra-ui/react"
import Home from "./Components/Home"
import ArticleList from './Components/ArticleList';
import SingleArticle from './Components/SingleArticle';
import SearchResults from './Components/SearchResults';
import ArticleSuggestions from './Components/ArticleSuggestions';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Footer from "./Components/Footer"
import { useEffect } from 'react';


function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(searchParams)
  },[])

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
          <Route path="/search" element={<SearchResults />} />
          {/* <Route path="/search" element={<ArticleSuggestions />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
        {/* <Routes>
          <Route path="search">
            <Route path=":searchparams" element={<ArticleSuggestions />} />
          </Route>
        </Routes> */}
      </main>
      </Container>
      <Footer />
    </div>
  );
}

export default App;

// <img src={logoLight} alt="" />
