const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://mpraveenck:1iMwaQTJMLbF1Nh4@cluster0.yi46gq8.mongodb.net/blogs')
.then(() =>(
    console.log('mongodb connencted')
))
.catch((err) => (
    console.log('something is wrong')
))

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userCollection = mongoose.model('users', userSchema);

module.exports = userCollection;
