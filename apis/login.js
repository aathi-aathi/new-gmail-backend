import express from "express"
import bcrypt from 'bcrypt'
import { db } from "../mongodb/mongodb-connect.js"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()
const loginRouter = express.Router()
loginRouter.post("/",async(req,res)=>{
    const userData = req.body
    const collection = db.collection("users")
    const userObj = await collection.findOne({email:userData.email,isVerified:true})
    if(userObj){
        bcrypt.compare(userData.password,userObj.password,async function(err, result) {
            if(err){
              res.status(500).send({msg:"Something went wrong"})
            }else{
                if(result){
                    var token = jwt.sign({email:userObj.email},process.env.JWT_SECRET)
                     res.send({message:'Login successfully',token:token})
                }
                else {
                    res.status(400).send({msg:"Please enter valid password",code:0})
                }}
        });
       }
       
    else{
        res.status(500).send({msg:"You are not user, Please register your account",code:1})
    }
})
export default loginRouter;