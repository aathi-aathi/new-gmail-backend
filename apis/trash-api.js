import  express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const trashRouter = express.Router()
trashRouter.put("/",async(req,res)=>{
    const data = req.body
    const inbox= await db.collection("users").findOne({email:data.userEmail,"inbox.id":data.id})
    try {
        if(inbox){
             await db.collection("users").updateOne({email:data.userEmail, "inbox.id":data.id},
        {$set:{"inbox.$.isDeleted":true}})}
       else{ 
        await db.collection("users").updateOne({email:data.userEmail, "sent.id":data.id},
        {$set:{"sent.$.isDeleted":true}})}
        res.send({msg:"put api works good"})
    } catch (error) {
        res.status(500).send({msg:"Something went wrong"})
    } 
})
export default trashRouter;