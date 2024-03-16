import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials=true;
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
function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState('')
    const[redirect, setredirect] = useState(false)
    const navigate = useNavigate();
    function createHandler(ev){
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file',file[0]);
        console.log(file)
        axios.post('http://localhost:4040/post',data)
        .then(res =>{
            console.log(res.statusText,res.status)
             if(res.statusText == 'OK'){
                setredirect(true);
             }
        })
    }
    if(redirect){
       return  navigate('/')
    }
  return (
    <form onSubmit={createHandler}>
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
        <button style={{marginTop:'10px'}}>Create Post</button>
    </form>
  )
}

export default CreatePost