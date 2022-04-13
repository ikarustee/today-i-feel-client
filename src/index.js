import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import  {HelmetProvider } from 'react-helmet-async';
import { ChakraProvider } from '@chakra-ui/react'
import ArticleContextProvider from './Contexts/ArticleContext';
import theme from './Components/Theme'
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ChakraProvider theme={theme}>
          <ArticleContextProvider>
            <App />
          </ArticleContextProvider>
        </ChakraProvider>
      </HelmetProvider> 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
