const Post = require("../models/Post");
const fs =require('fs')
//Create post

exports.createPost = async (req, res) => {
  const { title, text, username } = req.body;
  const filename = req.file && req.file.filename
  if(!title || !text || !username){
      return res.status(400).json({message:'All fields are required'})
  }
  try {
    const post = await Post.create({
      title,
      desc: text,
      username,
      photo:{
        data: fs.readFileSync('uploads/'+filename),
        contentType:"image/png"
      } 
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all posts

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// find single post

exports.singlePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};


// Delete post

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
