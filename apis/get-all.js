import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
 const allData = express.Router()
allData.get('/',async(req,res)=>{
    const data =await db.collection('users').find({},{
      projection:{email:1,name:1,_id:0,profile:1,userName:1}
    }).toArray()
    res.send(data)
 })
 export default allData;