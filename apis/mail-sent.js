import express from "express"
import { db } from "../mongodb/mongodb-connect.js"

const MailSentRouter = express.Router()
 MailSentRouter.post("/",async(req,res)=>{
   const userData = req.body
   const showDate = new Date()
    const date = showDate.getDate()+'/'+(showDate.getMonth()+1)+'/'+
     showDate.getFullYear()
   const  mailMatch  = await db.collection("users").findOne({email:userData.to})
   console.log('mail match - ',mailMatch)
    if(mailMatch){
     const userName =mailMatch.name
      const senderData = await db.collection("users").findOne({email:userData.from})
      await db.collection("users").updateOne(
        {email:userData.from},
        {$push:{sent:{...userData,recieverName:userName,isDeleted:false,isStarred:false,id:Date.now(),date:date}}}
      )
      await db.collection("users").updateOne(
        {email:userData.to},
        {$push:{inbox:{...userData,senderName:senderData.name,isDeleted:false,isStarred:false,id:Date.now(),date:date}}}
      );
      res.send({msg:"Mail sent successfully"})
     }
    else{
        res.status(404).send("email not found")
    }
 })
 export default MailSentRouter;