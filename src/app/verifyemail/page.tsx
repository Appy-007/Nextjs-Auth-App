/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import axios from "axios"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import Link from "next/link";


function VerifyemailPage(){
    const [token,setToken]=useState('')
    const [isverified,setIsverified]=useState(false)

    const verifyEmail=async()=>{
        try {
            await axios.post('/api/users/verifyemail',{token})
            setIsverified(true)
            toast.success("Verified!.")
            
        } catch (error:any) {
            console.log(error)
            toast.error("Error in verifying email")
            
        }
    }

    useEffect(()=>{
        const urlToken=window.location.search.split('=')[1]
        
        setToken(urlToken || '')

    },[])

    useEffect(()=>{
        if(token.length>0){
            verifyEmail()
        }
    },[token])

    return(
        <>
        <div className="h-screen flex flex-col gap-4 items-center justify-center bg-zinc-300">
            <h1 className="text-bold font-sm md:font-semibold">Verify your token</h1>
            <h2>{token ? `${token}` : ''}</h2>
            {isverified && (<div className="flex flex-col gap-4 items-center justify-center">
                <h2>Verified successfully</h2>
                <Link href='/login'>Login</Link>

            </div>)}
            
        </div>
        </>
    )
    

}

export default VerifyemailPage