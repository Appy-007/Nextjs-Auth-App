/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest,NextResponse } from "next/server";
import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModel";

connect()

export async function  POST(request:NextRequest) {
    
    try {
    const reqBody=await request.json()
    const {token}=reqBody
    const user=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt: Date.now()}})

    if(!user){
        return NextResponse.json({error:'Invalid token'},{status:400})
    }
    
    user.isVerified=true
    user.verifyToken=null
    user.verifyTokenExpiry=null
    await user.save()

    return NextResponse.json({
        message:'User verified',
        success:true,
        
    })
        
    } catch (error:any) {
         return NextResponse.json({error:error.message},{status:500})
        
    }
    
}