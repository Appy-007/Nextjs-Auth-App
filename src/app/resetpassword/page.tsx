/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import axios from "axios"
import {  useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Resetpassword(){
  const router=useRouter()
    const [isloading,setIsloading]=useState(false)
    const [resetpassworddata,setResetpassworddata]=useState({
      password:'',
      confirmPassword:'',
      token:''
    })

    useEffect(()=>{
      const urlToken=window.location.search.split('=')[1]
      console.log(urlToken)
      setResetpassworddata({...resetpassworddata,token:urlToken || ''})
      console.log(resetpassworddata.token)
    },[])
   

    const handleSubmit=async(e:any)=>{
      e.preventDefault()
      try {
        setIsloading(true)
        console.log('token',resetpassworddata.token)
        const response=await axios.post('/api/users/resetPassword',resetpassworddata)
        console.log(response)
        toast.success('Password reset successfully')
        router.push('/login')
        
      } catch (error:any) {
        console.log(error)
        toast.error(error)
        
      }
      finally{
        setIsloading(false)
      }

    }
    return ( 
    <>
    <div className="h-screen flex items-center justify-center bg-zinc-300 ">
            <form action="" className="flex flex-col px-4 md:px-10 py-4 md:py-6  bg-gray-800 text-gray-300 rounded-md gap-4 text-xs md:text-sm" onSubmit={handleSubmit}>
              
              
              <div className="flex gap-2 items-center justify-between ">
                <label htmlFor="password">New Password:</label>
                <input type="password" placeholder="Enter your password" value={resetpassworddata.password}   className="bg-gray-600 p-2 rounded-md outline-none"
                onChange={(e)=>setResetpassworddata({...resetpassworddata,password:e.target.value})}
                />
              </div>

              <div className="flex gap-2 items-center justify-between ">
                <label htmlFor="password">Confirm Password:</label>
                <input type="password" placeholder="Confirm your password" value={resetpassworddata.confirmPassword}   className="bg-gray-600 p-2 rounded-md outline-none"
                onChange={(e)=>setResetpassworddata({...resetpassworddata,confirmPassword:e.target.value})}
                />
              </div>
              
              <button className={`flex justify-center p-2 rounded-md cursor-pointer bg-gray-700 hover:bg-blue-800 ${isloading && 'opacity-50 cursor-not-allowed'}`}>
                {isloading ? "Updating password.." :"Submit"}
              </button>
            </form>
          </div>
    </>

    )
}

export default Resetpassword