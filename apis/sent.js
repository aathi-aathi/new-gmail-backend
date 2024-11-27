import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
 const sentMail = express.Router()
 sentMail.get('/:email',async(req,res)=>{
    const {email} = req.params
    const data = await db.collection('users').findOne({email:email},{projection:{_id:0,sent:1}})
    if(Object.keys(data).length > 0){
        const {sent} =  data
        res.send(sent)
    }else{
        res.send([])
    }
 })
 
 export default sentMail;