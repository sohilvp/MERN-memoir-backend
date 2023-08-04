const mongoose =require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:[
        String
    ],
    photo:{
        data:Buffer,
        contentType:String
        
    },
    username:{
        type:String,
        required:true

    },
    
},{timestamps:true})

const postModel =mongoose.model('Post',postSchema)

module.exports = postModel
