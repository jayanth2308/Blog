import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setpassword] = useState('')
  const Navigate = useNavigate()
   async function registerHandler (e) {
         e.preventDefault()
        try{
          await axios.post('http://localhost:4040/register',{username,password})
         .then( res =>{
           Navigate('/login')
        })
         .catch( err =>{
            alert('user already exist')
          console.log(err);
         })
        }
        catch(e){
          console.log(e)
        }
         
   }
  return (
    <div >
        
        <form className='register' onSubmit={registerHandler}>
            <h1>Register</h1>
            <input type='text' placeholder='user name' 
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
            <input type='password' placeholder='password'
            value={password}
            onChange={(e) => setpassword(e.target.value)}/>
            <button>Register</button>
        </form>
    </div>
  )
}

export default Register