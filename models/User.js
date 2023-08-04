const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:4,
        unique:true
    },
    email :{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        data:Buffer,
        contentType:String,
    }
    
},{timestamps:true})

const userModel =mongoose.model('User',userSchema)

module.exports = userModel