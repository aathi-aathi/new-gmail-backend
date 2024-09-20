import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
import multer from 'multer'
import path from 'path'
import cloudinary from './cloudinary.js'
const setProfile = express.Router()
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now()+ path.extname(file.originalname))
    }
})
const upload = multer({
    storage:storage
})
setProfile.post('/:email',upload.single('file'), async(req,res)=>{
    const param = req.params
    try {
         await cloudinary.uploader
         .upload(req.file.path,{folder:'images'})
         .then(async(result)=>
           await db.collection('users').updateOne({email:param.email},{$set:{profile:result.secure_url}})
        )
        .catch((err)=>console.log(err))
        res.send({msg:'success'})
       
    } catch (error) {
       res.status(500).send({msg:'not ok'}) 
    }
   
})
export default setProfile;