import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'arulaathish6@gmail.com',
        pass: process.env.GMAIL_PASS || '',
    }
})
const mailOptions = {
    from:'arulaathish6@gmail.com',
    to:[],
    subject:'Gmail Sending',
    text:'Sending Mails are so easy'
}
export {transporter,mailOptions}