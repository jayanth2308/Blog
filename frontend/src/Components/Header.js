import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials=true;

function Header() {
  const navigate= useNavigate();
  const{userInfo,setUserInfo} = useContext(UserContext)
  useEffect(() =>{
    try{
      axios.get('http://localhost:4040/profile')
         .then(res => {
             setUserInfo(res.data)
             console.log(userInfo)
         })
         .catch(e =>{
          console.log(e)
         })
    }
    catch(e){
      console.log(e)
    }
         
  },[])
  function logoutHandler(){
      
         axios.post('http://localhost:4040/logout')
         .then(res=>{
         })
         .catch(e =>{
          console.log(e)
         })
    setUserInfo(null)
    navigate('/login');
  }
   const username= userInfo?.username;
  return (
    <header>
    <Link to='/'className='logo'>MYBlogg</Link>
    <nav>
      { username && ( <>
           <Link to='/create'>Create a post</Link>
           <a onClick={logoutHandler}>Logout</a>
        </>)}
        { !username && (
          <>
          <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
          </>
        )}
      
    </nav>
  </header>
  )
}

export default Header