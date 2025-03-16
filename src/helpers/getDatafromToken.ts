/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export const getDatafromToken=async(request:NextRequest)=>{
    try {
        const token=request.cookies.get('token')?.value || ''
        const decodedToken:any=await jwt.verify(token,process.env.JWT_SECRET_KEY!)
        return decodedToken
        
    } catch (error:any) {
        throw new Error(error.message)
        
    }

}

 