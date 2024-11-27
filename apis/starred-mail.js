import  express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const starredRouter = express.Router()
starredRouter.put("/",async(req,res)=>{

    const data = req.body
    const inbox= await db.collection("users").findOne({email:data.userEmail,"inbox.id":data.id})
    
    try {
        if(inbox){
             await db.collection("users").updateOne({email:data.userEmail, "inbox.id":data.id},
        {$set:{"inbox.$.isStarred":true}})
    res.send({msg:"inbox mail starred succesfully"})
    }
       else{ 
        await db.collection("users").updateOne({email:data.userEmail, "sent.id":data.id},
        {$set:{"sent.$.isStarred":true}})
        res.send({msg:"sent mail starred succesfully"})
    }
       
    } catch (error) {
        res.status(500).send({msg:"Something went wrong"})
    }
})
export default starredRouter;