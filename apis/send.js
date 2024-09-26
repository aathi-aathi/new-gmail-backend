import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const sendRouter = express.Router()
sendRouter.post('/',async(req,res)=>{
    const showDate = new Date()
    const date = showDate.getDate()+'/'+(showDate.getMonth()+1)+'/'+ showDate.getFullYear()+', '+showDate.getHours()+'.'+showDate.getMinutes()
    console.log(date)
    const userData=req.body
    try {
        await db.collection('messages').insertOne({
        ...userData,
        date:date
    })
    res.send({msg:'success',code:1}) 
    } catch (error) {
        res.status(500).send({msg:'fail'})
    }
   
})
sendRouter.get('/:userName',async(req,res)=>{
    const {userName} = req.params
    const to_user = req.headers['user_name']
    const data = await db.collection('messages').aggregate([
        {
            $match:{
                $or:[
                    {
                      $and:[{ from: { $eq: userName } },
                        { to: { $eq: to_user } }]
                    },
                    {
                        $and:[{ to: { $eq: userName } },
                          { from: { $eq: to_user } }]
                      }
                ]
            }
        }
    ]).toArray()
    res.send(data)
})
export default sendRouter;