import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';

axios.defaults.withCredentials=true
const  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];
function EditPost() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState('')
    const[redirect, setredirect] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        try{
            axios.get(`http://localhost:4040/post/${id}`)
            .then(res =>{
                 setTitle(res.data.title)
                 setContent(res.data.content)
                 setSummary(res.data.summary)
            })
            .catch(err =>{
                console.log(err)
            })
           .catch(err =>{
            console.log(err)
           })
        }
        catch(err){
            console.log(err)
        }
           
    },[])
   async function updateHandler(ev){
        ev.preventDefault();
        const data = new FormData()
        data.set('title',title)
        data.set('summary', summary)
        data.set('content',content)
        data.set('file', file?.[0])
        data.set('id', id)
        try{
          await  axios.put('http://localhost:4040/post',data)
            .then(res =>{
                console.log(res)
                setredirect(true)
            })
        } catch(err){
            console.log(err)
        }
         
    }
    if(redirect){
        return  navigate(`/post/${id}`)
     }
  return (
    <form onSubmit={updateHandler} >
        <input type='title' 
        placeholder={'Title'}
        value={title}
        onChange={(e) =>setTitle(e.target.value)}
        ></input>
        <input type='summary'
         placeholder='summary'
         value={summary}
         onChange={(e) => setSummary(e.target.value)}
         ></input>
        <input type='file'

        onChange={(e) => setFile(e.target.files)}
        ></input>
        <ReactQuill value={content}
         onChange={newValue => setContent(newValue)}
          modules={modules} 
          formats={formats}/>
        <button style={{marginTop:'10px'}}>edit post</button>
    </form>
  )
}

export default EditPost

