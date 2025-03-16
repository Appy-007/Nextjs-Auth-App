/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '@/models/userModel'
import { connect } from '@/dbConfig/dbConfig'
import bcryptjs from 'bcryptjs'
import { NextRequest,NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'


connect()

export async function POST(request:NextRequest){
   
    try {
        const reqBody=await request.json()
        const {email,password} =reqBody
        if(!email || !password){
            return NextResponse.json({error:"Please enter all fields"},{status:400})
        }

        const user=await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"No such user exists "},{status:400})

        }
        const validPassword=await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Incorrect password.. Check your email and password again"},{status:400})

        }

        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email,
        }

        const token=await jwt.sign(tokenData,process.env.JWT_SECRET_KEY!,{expiresIn:"1d"})

        const response=NextResponse.json({
            message:"Logged in successfully",
            success:true,
        })

        response.cookies.set('token',token,{
            httpOnly:true,
            
        })

        return response

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }

}

