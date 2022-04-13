import './App.css';
import "./fonts.css"
import { useState } from 'react';
import { Routes, Route, useSearchParams, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import {Container} from "@chakra-ui/react"
import Home from "./Components/Home"
import ArticleList from './Components/ArticleList';
import SingleArticle from './Components/SingleArticle';
import SearchResults from './Components/SearchResults';
import Login from './Components/Login';
import About from './Components/About';
import NewArticle from './Components/NewArticle';
import Navbar from './Components/Navbar';
import Footer from "./Components/Footer"
import { useEffect } from 'react';
import Signup from "./Components/Signup";
import AdminDashboard from "./Components/AdminDashboard"
import EditArticleList from "./Components/EditArticleList"
import EditSingleArticle from "./Components/EditSingleArticle"
import ReportedArticleList from "./Components/ReportedArticleList"
import ReportedArticle from "./Components/ReportedArticle"

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPage, setSelectedPage] = useState()
  let location = useLocation();

  useEffect(() => {
    setSelectedPage(location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[location])

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
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/newarticle" element={<NewArticle />} />
          <Route path="/editarticles" element={<EditArticleList />} />
          <Route path="/editarticles/:id" element={<EditSingleArticle />} />
          <Route path="/reportedarticles" element={<ReportedArticleList />} />
          <Route path="/reportedarticles/:id" element={<ReportedArticle/>} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
