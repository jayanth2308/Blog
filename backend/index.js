
const express = require('express');
const cors = require('cors');
const app = express();
const cookieparser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const multer = require('multer');
const uploadMiddleware= multer({dest:'uploads/'});
const fs = require('fs')
app.use(express.json());
app.use(cookieparser())
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
const mongoose = require('mongoose')
const salt = bcrypt.genSaltSync(10)
const jwtSalt = bcrypt.genSaltSync(10)
mongoose.connect('mongodb+srv://mpraveenck:1iMwaQTJMLbF1Nh4@cluster0.yi46gq8.mongodb.net/blogs'
)
.then(() =>(
    console.log('mongodb connencted')
))
.catch((err) => (
    console.log(err)
))

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:4,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
})

const userCollection = mongoose.model('users', userSchema);

const postSchema = new mongoose.Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
    author:{type: mongoose.Schema.Types.ObjectId, ref:'users'}
},{
    timestamps:true,
})

const PostCollection = mongoose.model('posts', postSchema)

app.get('/test',(req,res) => (
   res.json('ok')
))
app.post('/register',async (req,res) => {
   const {username , password} = req.body;
   try{
    const UserDoc=  await userCollection.create({
        username,
        password:bcrypt.hashSync(password,salt),
    })
    res.json(UserDoc)
   } catch(err){
    res.status(400).json(err); 
   }
});
app.post('/login',async (req,res) =>{
    const {username, password} = req.body;
    try{
      const userDoc = await userCollection.findOne({username})
      if(userDoc){
        const check=  bcrypt.compareSync(password,userDoc.password);
        if(check){
             jwt.sign({username,id:userDoc._id},jwtSalt,{},(er,token)=>{
                if(er) throw er;
                res.cookie('token',token).json({
                    id:userDoc._id,
                    username,
                })
             });

        }
        else{
            res.status(401).json('wrong password')
        }
      }
      
         else{
            res.status(400).json('wrong credentials')
         }
      
    }
      catch(err){
        res.status(500).json(err)
      }
});

app.get('/profile',(req,res) =>{

    const {token} = req.cookies;
    jwt.verify(token, jwtSalt, {}, (err,info) =>{
      if(err) throw err;
      res.json(info);
    });
});

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
})

app.post('/post',uploadMiddleware.single('file'),async (req,res) =>{
   const {originalname,path} = req.file;
   const parts=originalname.split('.');
   const ext = parts[parts.length-1];
   const newPath = path+'.'+ext;
   fs.renameSync(path,newPath);
   const {token} = req.cookies;
    jwt.verify(token,jwtSalt,{},async (err,info) =>{
    if(err) throw err;
    const {title, summary, content} = req.body;
   try{
    const PostDoc= await PostCollection.create({
        title,
        summary,
        content,
        cover: newPath,
        author:info.id
    });
   res.json(PostDoc);
   }
   catch(err){
       res.json(err)
   }
   })
   
    });

app.get('/post',async (req,res) =>{

    const posts= await PostCollection.find()
   .populate('author',['username'])
   .sort({createdAt:-1})
   .limit(20);
   res.json(posts);
});

app.get('/post/:id',async (req,res) =>{
    try {
        const { id } = req.params;
        const postDoc = await PostCollection.findById(id).populate('author',['username']);
        
        if (!postDoc) {
          return res.status(404).json({ error: 'Post not found' });
        }
        res.json(postDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching post' });
      }
});
app.put('/post',uploadMiddleware.single('file'),async (req,res)  =>{
    let newPath= null;
    if(req.file){
        const {originalname, path} = req.file;
        const parts= originalname.split('.');
        const ext= parts[parts.length-1];
         newPath= path+'.'+ext;
        fs.renameSync(path,newPath)
    }
    const {token} = req.cookies;
    jwt.verify(token,jwtSalt,{}, async (err,info) =>{
        if(err) throw err;
         const {id,title, summary, content} = req.body;
        const postDoc= await PostCollection.findById(id)
    
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
         if(!isAuthor) {
           return res.status(400).json('you are not author')
         }
           await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath? newPath : postDoc.cover,
           });
           res.json(postDoc)
})
})
app.listen(4040, ()=>(
   console.log('server is connected at 4040')
))