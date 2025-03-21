/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import {connect} from "@/dbConfig/dbConfig"
import { sendMail } from "@/helpers/mailer";


connect()


export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {username,email,password}=reqBody

        if(!username || !email || !password){
            return NextResponse.json({error:"Please enter all fields"},{status:400})
        }

        const user=await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})

        }

        const salt=await bcryptjs.genSalt(10)
        const hashedpassword=await bcryptjs.hash(password,salt)

        const newUser=new User({
            username:username,
            email:email,
            password:hashedpassword,
        })

        const savedUser=await newUser.save()

        await sendMail({email:email,emailType:'VERIFY',userId:savedUser._id})
        
        return NextResponse.json({
            message:'New user created successfully',
            success:true,
            savedUser,
        })

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}