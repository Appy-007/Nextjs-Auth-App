/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/userModel";
import {connect} from '@/dbConfig/dbConfig'
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {password,confirmPassword,token}=reqBody;
        if(!password || !confirmPassword || !token){
            return NextResponse.json({error: 'Please input all the fields or check the token'},{status:400})

        }
        if(password !== confirmPassword){
            return NextResponse.json({error: 'New Password and Confirm Password must be same'},{status:400})
        }
        const user=await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt: Date.now()}})
        if(!user){
            return NextResponse.json({error: 'No such user exists... check your token '},{status:400})
        }
        console.log(user)
        const salt=await bcryptjs.genSalt(10)
        const hashedpassword=await bcryptjs.hash(password,salt)


        user.forgotPasswordToken=null
        user.forgotPasswordTokenExpiry=null
        user.password=hashedpassword
        await user.save()

        return NextResponse.json({
            message:'Password changed successfully',
            success:true,
            
        })

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }

}