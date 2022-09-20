import React,{useState} from 'react'
import axios from 'axios';
import './index.css'

const Register = () => {
    const [data,setData] = useState({
        userName:'',
        email:'',
        passWord:'',
        conformPassword:''
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/register',data).then(
            res => {alert(res.data);setData({
                userName:'',
                email:'',
                passWord:'',
                conformPassword:''
            })}
        ).catch((err) => alert(err))
    }
    
    // const submitHandler = e =>{
    //     e.preventDefault();
    //     axios.post('http://localhost:5000/register',data).then(
    //         res => alert(res.data)
    //     ).catch((err) => alert(err))
    // }

    return (
        <div>
            <center>
            <form onSubmit={submitHandler} autocomplete="off">
                <h1>Register</h1>
                <input type="text" onChange={changeHandler} className='search-bar' name="userName" placeholder="User Name" /><br />
                <input type="email" onChange={changeHandler} className='search-bar' name="email" placeholder="Email" /><br />
                <input type="password" onChange={changeHandler} className='search-bar' name="passWord" placeholder="Password" /><br />
                <input type="password" onChange={changeHandler} className='search-bar' name="conformPassword" placeholder="Confirm Password" /><br />
                <input className='Link' type="submit" value="Register" /><br />
            </form>
            </center>
        </div>
    )
}

export default Register