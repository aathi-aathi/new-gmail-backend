import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'

const moveMail = express.Router()
moveMail.post('/',async(req,res)=>{
   const {id} = req.body
   await db.collection('messages').updateOne({id:id},{$set:{isDeleted:false}})
   res.send({msg:'move successfully'})
})
export default moveMail