const express =require('express')
const app =express()
const mongoose =require('mongoose')
const cors = require('cors')
const dotenv =require('dotenv')
const path =require('path')
//middle wears
dotenv.config()
app.use(cors({origin:'https://techmemoir.onrender.com',credentials:true}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth',require( './routes/authRoute'))
app.use(require( './routes/userRoutes'))
app.use(require( './routes/postRoutes'))



// server && mongoDb connection
mongoose.connect(
    process.env.MONGO_CONNECT_URI
  ).then(()=> console.log('connected'))
  .catch(err=>console.log(err))


app.listen( process.env.PORT || 7334)

