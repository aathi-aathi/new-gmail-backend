import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const deleteMailRouter=express.Router()
deleteMailRouter.put("/",async(req,res)=>{
    const {userEmail,id} = req.body
    const inbox= await db.collection("users").findOne({email:userEmail,"inbox.id":id})
    const sent= await db.collection("users").findOne({email:userEmail,"sent.id":id})
    const draft= await db.collection("users").findOne({email:userEmail,"draft.id":id})
    try {
        if(inbox){
             await db.collection("users").updateOne(
        {email:userEmail},
        {$pull:{inbox:{id:id}}}
      )
      res.send({msg:"inbox msg deleted successfully"})
        }
        else if(sent){
            await db.collection("users").updateOne(
                {email:userEmail},
                {$pull:{sent:{id:id}}}
              )
              res.send({msg:"sent msg deleted successfully"})
        }
        else if(draft){
            await db.collection("users").updateOne(
                {email:userEmail},
                {$pull:{draft:{id:id}}}
              )
              res.send({msg:"draft msg deleted successfully"})
        }
        else{
            res.send({msg:"some error occured"})
        }
        
    } catch (error) {
        res.send(error)
    }
})
export default deleteMailRouter;