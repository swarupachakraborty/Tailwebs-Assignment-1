import React,{useState,useContext} from 'react'
import axios from 'axios'
import {store} from './App'
import { Navigate } from "react-router-dom";
import './index.css'

function Login() {
  const [token, setToken] = useContext(store)
  const [data,setData] = useState({
    email : '',
    passWord : ''
  })
  const changeHandler = e => {
    setData({...data,[e.target.name]:e.target.value})
  }
  
  const submitHandler = e =>{
    e.preventDefault();
    axios.post('http://localhost:5000/login',data).then(
        res => setToken(res.data.token)
    ).catch((err) => alert(err))
}

  if(token){
     return <Navigate to="/myProfile" />
  }
  return (
    <div>
      <center>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
            <input type='email' placeholder='email' onChange={changeHandler} className='search-bar' name='email' /><br />
            <input type='password' placeholder='password' onChange={changeHandler} className='search-bar' name='passWord' /><br />
            <input className='Tweet-button' type='submit' name='submit'/>
        </form>
      </center>
    </div>
  )
}

export default Login