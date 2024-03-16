import React, { useEffect, useState } from 'react'
import Posts from './posts'
import axios from 'axios'
function IndexPage() {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
      axios.get('http://localhost:4040/post')
      .then(res =>{
         setPosts(res.data)
      }).catch(err =>{
         console.log(err)
      }
      )
  },[])
  return (
    <div>
        {
          posts.length > 0 && posts.map(post =>(
            <Posts {...post}/>
          ))
        }
    </div>
  )
}

export default IndexPage