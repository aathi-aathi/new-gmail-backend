import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
import multer from 'multer'
import path from 'path'
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
        await db.collection('users').updateOne({email:param.email},{$set:{profile:req.file.filename}})
        res.send({msg:'profile updated successfully'})
    } catch (error) {
       res.status(500).send({msg:'not ok'}) 
    }
   
})
export default setProfile;