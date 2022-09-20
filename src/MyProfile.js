import React,{useContext,useState,useEffect} from 'react'
import {store} from './App';
import { Navigate } from 'react-router';
import axios from 'axios';
import './index.css'

const Myprofile = () => {
    const [token,setToken] = useContext(store);
    const [data,setData] = useState(null);
    useEffect(() =>{
        axios.get('http://localhost:5000/myProfile',{
            headers: {
                'x-token' : token
            }
        }).then(res => setData(res.data)).catch((err) => console.log(err))
    },[])
    if(!token){
        return <Navigate to='/login' />
    }
    return (
        <div>
            {
                data &&
            <center>
                <br />
                <div>
                    <h1>Welcome : {data.userName}</h1><br />
                    <h1> {data.email} </h1><br />
                    <button className='button' onClick={() => setToken(null)}>Logout</button>
                </div>
            </center>
        }
        </div>
    )
}

export default Myprofile