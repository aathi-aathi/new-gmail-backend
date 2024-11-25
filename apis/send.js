import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const sendRouter = express.Router()
sendRouter.post('/',async(req,res)=>{
    const showDate = new Date()
    const date = showDate.getDate()+'/'+(showDate.getMonth()+1)+'/'+
     showDate.getFullYear()
    const userData=req.body
    try {
        await db.collection('messages').insertOne({
        ...userData,
        date:date,
        id:Date.now().toString()
    })
    res.send({msg:'success',code:1}) 
    } catch (error) {
        res.status(500).send({msg:'fail'})

    }
})
export default sendRouter;