import React, { useContext, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { UserContext } from './UserContext';

axios.defaults.withCredentials =true;

function Login(e) {
  const [username, setUsername] = useState('')
  const [redirect, setDirect] =useState()
  const [password, setPassword] = useState('')
  const {setUserInfo} = useContext(UserContext)
  const Navigate = useNavigate()
 async function loginHandler(e){
     e.preventDefault()
     try{
       await axios.post('http://localhost:4040/login',{username, password})
    .then(res =>{
      if(res){
        setUserInfo(res.data)
        setDirect(true)
      }else{
        alert('wrong credentials')
      }
      
    }).catch(err => {
      if(err.response.status === 400){
        alert('wrong credentials')

      }
      else{
        alert('wrong password')
      }
    })
     }
     catch(e){
         console.log(e)
     }
   
  }
  if(redirect){
    return Navigate('/')
  }
  return (
  
    <div >
        <form className='login' onSubmit={loginHandler}>
            <h1>Login</h1>
            <input type='text' placeholder='user name' 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input tpye='password' placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
        </form>
    </div>
  )
}

export default Login