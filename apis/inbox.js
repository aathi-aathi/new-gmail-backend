import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
 const inboxMail = express.Router()
 inboxMail.get('/:email',async(req,res)=>{
    const userData = req.params
   const data = await db.collection('messages').aggregate([
      {
        $match: { to: userData.email }  // Match teachers in Chennai
      },
      {
        $lookup: {
          from: "users",          // Join with Collection1 (Teachers)
          localField: "to",      // teacher_id in Collection2
          foreignField: "email",           // id in Collection1
          as: "reciever_info"
        }
      },
      {
        $unwind: "$reciever_info"         // Flatten the teacher_info array
      },
      {
        $project: {
          _id: 0,
          name: "$reciever_info.name",  
          message: "$message",                
          subject: "$subject",
          date:"$date",
          id:"$id",
          isDeleted:"$isDeleted"
        }
      }
    ]).toArray();
    res.send(data)
 })
 inboxMail.post('/',async(req,res)=>{
  const userData = req.body
   await db.collection('messages').updateOne({id:userData.id},{$set:{isDeleted:true}})
   res.send({msg:'success deleted'})
 })
 export default inboxMail;