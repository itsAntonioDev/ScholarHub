import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'



//PAGES

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
//import Home from './pages/home'

const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: #173858;
    --color-secondary: #29aaad;
    --color-tertiary: #c0f2f4
  }
  
  * {
    font-family: 'Inter', sans-serif;
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
        <Route path="/register" element = {<Register/>}/>
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode> 
)
 