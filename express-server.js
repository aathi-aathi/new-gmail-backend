import express from 'express'
import connectToDb from './mongodb/mongodb-connect.js';
import cors from 'cors'
import registerRouter from './apis/register.js';
import loginRouter from './apis/login.js';
import forgotPasswordRouter from './apis/forgot-password.js';
import checkOtpRouter from './apis/check-otp.js';
import resetPasswordRouter from './apis/reset-password.js';
import userInfo from './apis/user-info.js';
import setProfile from './apis/set-profile.js';

const server = express()
server.use(express.json())
server.use(cors())
await connectToDb()
server.use(express.static('public'))
server.use('/register',registerRouter)
server.use('/login',loginRouter)
server.use('/forgot-password',forgotPasswordRouter)
server.use('/check-otp',checkOtpRouter)
server.use('/reset-password',resetPasswordRouter)
server.use('/user-info',userInfo)
server.use('/set-profile',setProfile)
const port= 9000;
server.listen(port,()=>{
    console.log(Date().toString(),"express port : " ,port)
})