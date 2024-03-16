import React, { useEffect } from 'react'

function Profile() {
    useEffect(()=>{
           axios.get('http://local:4040/profile')
    },[])
  return (
    <div>
    
    </div>
  )
}

export default Profile