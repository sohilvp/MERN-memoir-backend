const express =require('express')
const { createPost, getAllPosts, singlePost, deletePost } = require('../controllers/postController')
const router =express.Router()
const multer = require ('multer')

const storage =multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads')
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
})

const upload =multer({storage:storage})

router.route("/posts").post(upload.single("photo"),createPost)
                      .get(getAllPosts)
router.route("/posts/:id").get(singlePost)
                          .delete(deletePost)



module.exports=router