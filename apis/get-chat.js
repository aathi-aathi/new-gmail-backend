import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'

const getChatRouter = express.Router()

getChatRouter.get('/:userName',async(req,res)=>{
    const {userName} = req.params
    const data = await db.collection('follows').aggregate([
        {
          $match:{
           $and:[{from:userName},{status:'accepted'}]
          }
        },
        {
          $lookup: {
            from: "users",        
            localField: "to",
            foreignField: "userName",
            as: "user_info" 
          }
        },
        {
          $unwind: "$user_info" 
        },
        {
           $project:{
              _id:0,
              userName:"$user_info.userName",
              profile:"$user_info.profile",
              name:"$user_info.name"
           }
        }
      ]).toArray()
      res.send(data)
})
export default getChatRouter;