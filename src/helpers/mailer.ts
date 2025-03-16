/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendMail=async({email,emailType,userId}:any)=>{
    try {
        const hashedToken=await bcryptjs.hash(userId.toString(),10)
        if(emailType==='VERIFY'){
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+6*60*60*1000,
            })
        }
        else if(emailType==='RESET'){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now()+3*60*60*1000,
            })
        }

       // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASSWORD
            }
          });

          const mailOptions={
            from:'apratim.raha23@gmail.com',
            to:email,
            subject:emailType==='VERIFY' ? 'Verify your account' :'Reset your password',
            html:`<p>Click <a href="${process.env.DOMAIN}/${emailType==='VERIFY'? 'verifyemail' : 'resetpassword'}?token=${hashedToken}">here </a> to
            ${emailType==='VERIFY' ? 'verify your mail' : 'reset your password'} or copy the link below <br/>
            ${process.env.DOMAIN}/${emailType==='VERIFY'? 'verifyemail' : 'resetpassword'}?token=${hashedToken} </p>`
          }

          const mailresponse=await transport.sendMail(mailOptions)
          return mailresponse

        
    } catch (error:any) {
        throw new Error(error.message)
        
    }

}