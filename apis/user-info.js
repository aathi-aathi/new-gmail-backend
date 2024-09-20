import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
 const userInfo = express.Router()
 userInfo.get('/:userName',async(req,res)=>{
    const userData = req.params
    console.log(userData.userName)
    const data =await db.collection('users').findOne({userName:userData.userName},{
      projection:{email:1,name:1,_id:0,profile:1,userName:1}
    })
    res.send(data)
 })
 export default userInfo;