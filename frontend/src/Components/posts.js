import React from 'react'
import { Link } from 'react-router-dom'

function Posts({_id,title,summary,cover,content, createdAt,author}) {
  return (

 <div class='post'>
        <div className='image'>
          <Link to={`/post/${_id}`}>
            <img src={'http://localhost:4040/'+cover} alt="loading...."/>
          </Link>
          
        </div>
        <div>
          <div className='texts'>
        <h2>{title}</h2>
          <p className='info'>
               <a className='author'>{author.username}</a>
               <time>{createdAt}</time>
          </p>
        <p className='summary'>{summary}</p>
        </div>
        </div>
        
        
    </div>

  )
}

export default Posts