import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const setProfile = express.Router()
setProfile.post('/',async(req,res)=>{
    const userData = req.body
    await db.collection('users').updateOne({email:userData.email},{$set:{profile:userData.profile}})
    res.send({msg:'profile updated successfully'})
})
export default setProfile;