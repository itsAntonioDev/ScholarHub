import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'



//PAGES

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Billing from './pages/Billing'
import Exams from './pages/Exams'
import Features from './pages/Features'
import Settings from './pages/Settings'
import Students from './pages/Students'
import AddStudent from './pages/AddStudent'
import Classes from './pages/Classes'
import AddClass from './pages/AddClass'
import Teachers from './pages/Teachers'
import AddTeacher from './pages/AddTeacher'
import TeacherProfile from './pages/TeacherProfile'
import { TeachersProvider } from './providers/TeachersContext'
import { StudentsProvider } from './providers/StudentsContext'
import { ClassesProvider } from './providers/ClassesContext'
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
      <TeachersProvider>
        <StudentsProvider>
        <ClassesProvider>
        <Routes>
          <Route path="/" element = {<Navigate to={"/login"}/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/register" element = {<Register/>}/>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/billing' element={<Billing />} />
          <Route path='/exams' element={<Exams />} />       {/* era /settings */}
          <Route path='/features' element={<Features />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/students' element={<Students />} />
          <Route path='/students/add' element={<AddStudent />} />
          <Route path='/classes' element={<Classes />} />
          <Route path='/classes/add' element={<AddClass />} />
          <Route path='/teachers' element={<Teachers />} />
          <Route path='/teachers/add' element={<AddTeacher />} />
          <Route path='/teachers/:id' element={<TeacherProfile />} />
        </Routes>
        </ClassesProvider>
        </StudentsProvider>
      </TeachersProvider>
    </BrowserRouter>
  </StrictMode> 
)