import  express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const moveMailRouter = express.Router()
moveMailRouter.put("/",async(req,res)=>{
    const data = req.body
    const inbox= await db.collection("users").findOne({email:data.userEmail,"inbox.id":data.id})
    const sent= await db.collection("users").findOne({email:data.userEmail,"sent.id":data.id})
    try {
        if(inbox){
             await db.collection("users").updateOne({email:data.userEmail, "inbox.id":data.id},
        {$set:{"inbox.$.isDeleted":false}})
        res.send({msg:"move to inbox successfuly"})
    }
       else if(sent){ 
        await db.collection("users").updateOne({email:data.userEmail, "sent.id":data.id},
        {$set:{"sent.$.isDeleted":false}})
        res.send({msg:"move to sent successfuly"})
    }
       else{
        res.send({msg:"someerror occured"})
       }
    } catch (error) {
        res.status(500).send({msg:"Something went wrong"})
    }
  
})
export default moveMailRouter;