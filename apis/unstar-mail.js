import  express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const unstarRouter = express.Router()
unstarRouter.put("/",async(req,res)=>{
    const data = req.body
    const inbox= await db.collection("users").findOne({email:data.userEmail,"inbox.id":data.id})
    const sent= await db.collection("users").findOne({email:data.userEmail,"sent.id":data.id})
    try {
        if(inbox){
             await db.collection("users").updateOne({email:data.userEmail, "inbox.id":data.id},
        {$set:{"inbox.$.isStarred":false}})
        res.send({msg:"inbox: unstar  successfuly"})
    }
       else if(sent){ 
        await db.collection("users").updateOne({email:data.userEmail, "sent.id":data.id},
        {$set:{"sent.$.isStarred":false}})
        res.send({msg:"sent: unstar successfuly"})
    }
       else{
        res.send({msg:"someerror occured"})
       }
    } catch (error) {
        res.status(500).send({msg:"Something went wrong"})
    }
  
})
export default unstarRouter;