import express from 'express'
import { db } from '../../mongodb/mongodb-connect.js'

const rejectRequest = express.Router()
rejectRequest.delete('/',async(req,res)=>{
    const userData = req.body
    console.log(userData.from)
    console.log(userData.to)
    await db.collection('follows').deleteOne({from:userData.from,to:userData.to})
    res.send({msg:'success'})
})
export default rejectRequest;