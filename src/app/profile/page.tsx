/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {  useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

function ProfilePage(){

    const router=useRouter()

    const [isloading,setIsloading]=useState(false)
    const [userId,setUserId]=useState('')
    const [username,setUsername]=useState('')
    const handleLogout=async()=>{
        try {
            setIsloading(true)
            const response=await axios.get('/api/users/logout')
            console.log(response)
            toast.success("Logged out successfully!")
            router.push('/login')
            
        } catch (error:any) {
             toast.error(error.message)
            
        }
        finally{
            setIsloading(false)
        }

    }

    


    const getUserDetails=async()=>{
        try {
            const response=await axios.get('/api/users/user')
            
            setUserId(response.data.data._id)
            setUsername(response.data.data.username)
            
       
        } catch (error:any) {
            toast.error(error.message)
            
        }
       
    }

    return(
        <div className="h-screen bg-zinc-300 flex flex-col gap-6 justify-center items-center">
            <div className="flex flex-col items-center justify-center pb-5">
            <h1 className="text-sm md:text-2xl text-zinc-800 font-bold text-center pb-5">Welcome to the Profile Page</h1>
            <h1 className="text-sm md:text-lg text-zinc-600 font-semibold text-center pb-2">Hello  {username} !! You have come across a lot of steps to get here. </h1>
            <h1 className="text-sm md:text-lg text-zinc-600 font-semibold text-center pb-2"> Appy is going to give you a present for giving your valuable time...Click on the button below</h1>

            </div>
            

            
             <button
             className={`flex justify-center p-2 rounded-md cursor-pointer bg-green-700 text-white hover:bg-green-900 ${isloading && 'opacity-50 cursor-not-allowed'}`}
             onClick={getUserDetails}>
                Generate your lucky token 
             </button>
             {userId && (<h2 className="hover:text-blue-800 font-semibold text-center">Click Here: <Link href={`/profile/${userId}`}>{userId}</Link></h2>)}

             <button
             className={`flex justify-center p-2 rounded-md cursor-pointer bg-red-700 text-white hover:bg-red-950 ${isloading && 'opacity-50 cursor-not-allowed'}`}
             onClick={handleLogout}>
                {isloading ? 'Logging out...' :'Log out'}
             </button>
        </div>

    )
}

export default ProfilePage