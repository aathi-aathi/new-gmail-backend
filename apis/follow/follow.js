import express from 'express'
import { db } from '../../mongodb/mongodb-connect.js'
const followRouter = express.Router()
followRouter.post('/',async(req,res)=>{
    const userData=req.body
    try {
        await db.collection('follows').insertOne({
        ...userData,
        status:'request sent',
        date:Date().toString()
    })
    res.send({msg:'success',code:1}) 
    } catch (error) {
        res.status(500).send({msg:'fail'})
    }
   
})
followRouter.get('/:userName',async(req,res)=>{
    const userData = req.params
    const to_user = req.headers['user_name']
   const data = await db.collection('follows').findOne({from:userData.userName,to:to_user})
   res.send(data)
})
export default followRouter;
