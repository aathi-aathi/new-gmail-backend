import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const draftRouter=express.Router()
draftRouter.get('/:email',async(req,res)=>{
  const {email} = req.params
  const data = await db.collection('users').findOne({email:email},{projection:{_id:0,draft:1}})
  if(Object.keys(data).length > 0){
      const {draft} =  data
      res.send(draft)
  }else{
      res.send([])
  }
})
 draftRouter.post("/",async(req,res)=>{
  const userData = req.body
  const showDate = new Date()
  const date = showDate.getDate()+'/'+(showDate.getMonth()+1)+'/'+
  showDate.getFullYear()
    try {
        await db.collection("users").updateOne(
            {email:userData.from},
            {$push:{draft:{...userData,isDeleted:false,id:Date.now(),date:date}}}
          )
          res.send({msg:"draft created successfully"})
    } catch (error) {
        res.send(error)
    }
 })
 export default draftRouter;