/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";
import {connect} from '@/dbConfig/dbConfig'
import { sendMail } from "@/helpers/mailer";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {email}=reqBody

        if(!email){
            return NextResponse.json({error:'Please enter email'},{status:400})
        }

        const user=await User.findOne({email:email})
        if(!user){
            return NextResponse.json({error:'No user exists for this email .... Please check again'},{status:400})

        }

        await sendMail({email:email,emailType:'RESET',userId:user._id})

        return NextResponse.json({
                    message:'Password reset mail sent successfully',
                    success:true,
                    user,
                    
                })
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}