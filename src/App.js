import './App.css';
import "./fonts.css"
import { Routes, Route, Link, useSearchParams } from "react-router-dom";
import {Container} from "@chakra-ui/react"
import Home from "./Components/Home"
import ArticleList from './Components/ArticleList';
import SingleArticle from './Components/SingleArticle';
import SearchResults from './Components/SearchResults';
import Chart from './Components/Chart';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Footer from "./Components/Footer"
import { useEffect } from 'react';
import Signup from "./Components/Signup";
import AdminDashboard from "./Components/AdminDashboard"


function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(searchParams)
  },[])

  return (
    <div className="App">
      <Navbar />
      <Container maxW='1100px' centerContent>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:id" element={<SingleArticle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/chart" element={<Chart />} />
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
