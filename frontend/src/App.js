
import './App.css';
import Posts from './Components/posts';
import Header from './Components/Header';
import {Routes, Route}from 'react-router-dom';
import Login from './Components/Login'; 
import Register from './Components/Register';
import Layout from './Components/Layout';
import IndexPage from './Components/IndexPage';
import CreatePost from './Components/CreatePost'
import PostPage from './Components/PostPage';
import EditPost from './Components/EditPost';
import UserContext, { UserContextProvider } from './Components/UserContext';

function App() {
  return (
   <UserContextProvider>
      <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>}>
      </Route>
      <Route path='/create' element={<CreatePost/>}></Route>
      <Route path='/login' element={<Login/> }></Route>
      <Route path='/register'element={<Register/>}></Route>
      <Route path='/post/:id' element={<PostPage/>}></Route>
      <Route path='/edit/:id' element={<EditPost/>}></Route>
      </Route>
    </Routes>   
   </UserContextProvider>
 

  );
}

export default App;
