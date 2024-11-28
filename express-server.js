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
import MailSentRouter from './apis/mail-sent.js';
import inboxMail from './apis/inbox.js';
import sentMail from './apis/sent.js';
import starredRouter from './apis/starred-mail.js';
import unstarRouter from './apis/unstar-mail.js';
import moveMailRouter from './apis/move-to-inbox.js';
import trashRouter from './apis/trash-api.js';
import draftRouter from './apis/draft.js';
import deleteMailRouter from './apis/delete-mail.js';
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
server.use('/mail-send',MailSentRouter)
server.use('/inbox',inboxMail)
server.use('/sent',sentMail)
server.use('/move-mail',moveMailRouter)
server.use('/set-star',starredRouter)
server.use('/unstar',unstarRouter)
server.use('/trash',trashRouter)
server.use('/draft',draftRouter)
server.use('/delete-mail',deleteMailRouter)
const port= 9000;
server.listen(port,()=>{
    console.log(Date().toString(),"express port : " ,port)
}) 