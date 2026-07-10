import {Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {
  return (
    <Routes>
      <Route path = "/" element={<Login/>}/>
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/register" element={<Register/>}/>
    </Routes>
  )
}

export default App
