import React, { useContext, useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from './UserContext';

function PostPage() {
    const [postInfo, setPostInfo] = useState({})
    const {id}= useParams();
    const {userInfo} = useContext(UserContext)
    useEffect(() =>{
        axios.get(`http://localhost:4040/post/${id}`)
        .then(res =>{
             setPostInfo(res.data)
        })
        .catch(err =>{
            console.log(err)
        })
    },[])
    if(!postInfo) return '';
    const image =postInfo.cover
  return (
    <div className='postPage'> 
        <h1>{postInfo.title}</h1>
        <time>{postInfo.createdAt}</time>
        

        {postInfo.author && (
            
       <div className='author'>
      by {postInfo.author.username || 'Unknown Author'}
      </div>
      )}

      {userInfo?.id === postInfo.author?._id &&(
            <div className='editDiv'>
                <Link className='editLink' to={`/edit/${postInfo._id}`}>edit post</Link>
            </div>

            
        )}
        <div className='image'>
             <img src={'http://localhost:4040/'+ postInfo.cover} alt='Loading'/>
        </div>
        
          <div dangerouslySetInnerHTML={{__html:postInfo.content}} className='summary'></div>
    </div>
  )
}

export default PostPage