const express =require('express')
 const router =express.Router()
const {createUser,  updateUser, findUser} =require('../controllers/userController')
const multer = require ('multer')

const storage =multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'profile')
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
})

const upload =multer({storage:storage})


router.route("/register").post(upload.single('profile'),createUser)
router.route("/user/:id").get(findUser)
router.route("/user/:id").patch(upload.single('profile'),updateUser)
                         
                         


module.exports=router