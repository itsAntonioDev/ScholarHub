import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

//PAGES

import Login from './pages/Login'
//import Home from './pages/home'

const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: #173858;
    --color-secondary: #29aaad;
    

  }
  
  * {
    margin: 0;
    padding: 0;
  }
`

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Navigate to={"/login"}/>}/>
        <Route path="/login" element = {<Login/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode> 
)
 