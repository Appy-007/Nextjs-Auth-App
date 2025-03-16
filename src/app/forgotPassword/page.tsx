/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

function ForgotPassword(){
    const [isloading,setIsloading]=useState(false)
    const [forgotPasswordform,setForgotPasswordform]=useState({
      email:'',
    })
    const handleSubmit=async(e:any)=>{
      e.preventDefault()
      try {
        setIsloading(true)
        const response=await axios.post('/api/users/forgotPassword',forgotPasswordform)
        
        toast.success('Email Sent successfully .Check your email..')

        
      } catch (error:any) {
        
        toast.error(error.response.data.error)
        
      }
      finally{
        setIsloading(false)
      }

    }
    return (
        <>
        <div className="h-screen flex flex-col items-center justify-center bg-zinc-300 ">
          <div className="flex flex-col items-center justify-center flex-wrap pb-5 px-5">
          <h1 className="text-sm md:text-2xl text-zinc-800 font-bold text-center">After submiting check your email for reset password</h1>
          </div>
        
        <form action="" className="flex flex-col px-4 md:px-10 py-4 md:py-6  bg-gray-800 text-gray-300 rounded-md gap-4 text-xs md:text-sm" onSubmit={handleSubmit}>
          <div className="flex gap-2 items-center justify-between ">
            
            <input type="text" placeholder="Enter your email address" value={forgotPasswordform.email}   className="bg-gray-600 p-2 rounded-md outline-none" 
            onChange={(e)=>setForgotPasswordform({...forgotPasswordform,email:e.target.value})}
            />
          </div>
          
          
          <button className={`flex justify-center p-2 rounded-md cursor-pointer bg-gray-700 hover:bg-blue-800 ${isloading && 'opacity-50 cursor-not-allowed'}`}>
            {isloading ? "please wait.." :"Submit"}
          </button>
        </form>
      </div>
        </>
    )
}

export default ForgotPassword