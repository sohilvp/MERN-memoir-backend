const User = require("../models/User")
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')



exports.loginUser = async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ 'error': "Email and Password is required" })
    try {
        const foundUser = await User.findOne({email}).exec()
    const user = await User.findById(foundUser?.id,"-password")
    if(!foundUser) return res.status(400).json({'error':'User not found'})
    const match = await bcrypt.compareSync(password,foundUser.password)
    if(!match) return res.status(401).json({'error':'Wrong email or password '})
    return res.status(200).json({user})
    } catch (error) {
        return res.status(400).json(error)
    }

    
};




