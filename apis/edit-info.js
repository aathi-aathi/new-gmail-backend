import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const editInfo = express.Router()
editInfo.put('/',async(req,res)=>{
  const  userData = req.body
  await db.collection('users').updateOne({user_name:userData.user_Name},{$set:{
    name:userData.name,about:userData.about
  }})
  res.send({msg:'success'})
})
export default editInfo;