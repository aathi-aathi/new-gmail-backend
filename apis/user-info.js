import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
 const userInfo = express.Router()
 userInfo.get('/:email',async(req,res)=>{
    const userData = req.params
    const data =await db.collection('users').findOne({email:userData.email},{
      projection:{email:1,name:1,_id:0,profile:1}
    })
    res.send(data)
 })
 export default userInfo;