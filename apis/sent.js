import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
 const sentMail = express.Router()
 sentMail.get('/:email',async(req,res)=>{
    const userData = req.params
    const data =await db.collection('messages').findOne({from:userData.email})
    res.send(data)
 })
 export default sentMail;