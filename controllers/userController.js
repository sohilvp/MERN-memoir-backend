const Users = require("../models/User");
const bcrypt = require('bcryptjs')
const fs = require('fs')


//Register New User


exports.createUser =async (req, res) => {

  const {username,password,email} =req.body
   
  if(!username || !password || !email){
    return res.status(422).json({message: "please fill all details"})
  }
    try {
      
      const userExist = await Users.findOne({username} )
      const emailExist = await Users.findOne({email})
      
      if( userExist !== null){
        return res.status(422).json({message: "Username already exists"})
      }
      if( emailExist !== null){
        return res.status(422).json({message: "Email already registered"})
      }
      
      const hashedpass = await bcrypt.hashSync(password);
      const user = await Users.create({
        username,
        password: hashedpass,
        email,
        profilePic:req.file ?{
          data: fs.readFileSync('profile/'+ req?.file?.filename),
          contentType:"image/png"
        } :null
       
      });
      res.status(201).json({message :"User created"});
    } catch (err) {
      
      res.status(500).json(err);
    }
  }



// Find User

exports.findUser =async (req, res) => {
 const { id} =req.params

  try {
    const user = await Users.findOne({_id:id});
    res.status(200).json({user});
  } catch (err) {
    res.status(500).json(err);
  }
}



//Update user

exports.updateUser = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const file = req.file;
  const { id } = req.params;

  if (!oldPassword) {
    return res.status(400).json({ message: "Please enter your old password" });
  }

  try {
    const user = await Users.findById(id);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const emailExists = await Users.findOne({ email });
    const isEmailSameAsCurrentUser = emailExists && emailExists._id.toString() === id.toString();
    
    if (!isEmailSameAsCurrentUser && emailExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const isOldPasswordValid = await bcrypt.compareSync(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    let updatedUserFields = {
      email: isEmailSameAsCurrentUser ? user.email : email,
      password: newPassword ? await bcrypt.hashSync(newPassword) : user.password,
    };

    if (file) {
      updatedUserFields.profilePic = {
        data: fs.readFileSync('profile/'+ req?.file?.filename),
        contentType:"image/png"
      }
    }
    

    const updatedUser = await Users.findByIdAndUpdate(
      id,
      { $set: updatedUserFields },
      { new: true }
    );

    return res.status(200).json({user:updatedUser});
  } catch (err) {
    return res.status(500).json(err);
  }
};
