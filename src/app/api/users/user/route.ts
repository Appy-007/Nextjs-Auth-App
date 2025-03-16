/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {getDatafromToken} from "@/helpers/getDatafromToken";
import User from "@/models/userModel";
import {connect} from  "@/dbConfig/dbConfig"
import { NextRequest,NextResponse } from "next/server";


connect()

export async function GET(request:NextRequest){
    try {
        const userDetail=await getDatafromToken(request)
        
        const {id}=userDetail
        const user=await User.findOne({_id:id}).select("-password")
        return NextResponse.json({message:"User found",data:user})

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}