import express from "express"
import bcrypt from 'bcrypt'
import { db } from "../mongodb/mongodb-connect.js"
import { transporter,mailOptions } from "./mail-utils.js"
import jwt from 'jsonwebtoken'
 const registerRouter = express.Router()
registerRouter.post("/",async(req,res)=>{
    const userData = req.body
    const collection = db.collection("users")
    const userEmail = await collection.findOne({email:userData.email})
    const userName = await collection.findOne({userName:userData.userName})
      try {
        if(userName || userEmail){
            
            res.status(400).send({message:"User already exist",code:1})
        }
        else{
            bcrypt.hash(userData.password,10,async function(err,hash) {
                if(err){
                    res.status(500).send({msg:"something error in your password"})
                }
                else{
                    await collection.insertOne({
                ...userData,
                password:hash,
               isVerified:false
            })
            await collection.updateOne({email:userData.email},{$set:{otp:Math.floor(1000 + Math.random() * 9000)}})
            const get_otp = await collection.findOne({email:userData.email})
                  await transporter.sendMail({
                    ...mailOptions,
                    to:userData.email,
                    subject:"Verify your account",
                    text:
                    `Hi!! ${get_otp.name}!!,
                  otp: ${get_otp.otp}`,
                  })
              var token = jwt.sign({email:userData.email},process.env.JWT_SECRET)
             res.send({msg:"registered successfully",token:token})
    }});
    } 
      } catch (error) {
        res.status(500).send({message:'Something went wrong'})
      }
})
export default registerRouter;