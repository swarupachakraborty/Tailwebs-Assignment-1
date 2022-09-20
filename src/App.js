import React, {createContext,useState}from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import MyProfile from './MyProfile'
import Nav from './Nav'

export const store = createContext();

function App() {
  const [token,setToken] = useState(null);
  return (
    <div>
      <store.Provider value={[token,setToken]}>
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/Register' element={<Register />}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/MyProfile' element={<MyProfile />}/>
      </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
  )
}

export default App