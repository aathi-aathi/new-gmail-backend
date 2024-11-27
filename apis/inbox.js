import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
 const inboxMail = express.Router()
 inboxMail.get('/:email',async(req,res)=>{
    const {email} = req.params
    const data = await db.collection('users').findOne({email:email},{projection:{_id:0,inbox:1}})
    if(Object.keys(data).length > 0){
        const {inbox} =  data
        res.send(inbox)
    }else{
        res.send([])
    }
 })
 
 export default inboxMail;