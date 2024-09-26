import express from 'express'
import { db } from '../../mongodb/mongodb-connect.js'

const acceptRequest = express.Router()
acceptRequest.put('/',async(req,res)=>{
    const userData = req.body
    await db.collection('follows').updateOne({from:userData.from,to:userData.to},{$set:{status:'accepted'}})
    res.send({msg:'success'})
})
export default acceptRequest;