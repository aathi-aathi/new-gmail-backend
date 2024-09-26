import express from 'express'
import { db } from '../../mongodb/mongodb-connect.js'
const followRequest = express.Router()
followRequest.get('/:userName',async(req,res)=>{
   const userData =req.params
  const data = await db.collection('follows').aggregate([
      {
        $match:{
         $and:[{to:userData.userName},{status:'request sent'}]
        }
      },
      {
        $lookup: {
          from: "users",        
          localField: "from",
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
export default followRequest;