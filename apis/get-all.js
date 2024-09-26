import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
 const allData = express.Router()
allData.get('/',async(req,res)=>{
  const data =  await db.collection('users').find({},{
    projection:{name:1,profile:1,userName:1,_id:0}
  }).toArray()
     
    res.send(data)
 })
 export default allData;