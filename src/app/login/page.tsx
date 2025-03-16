/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";

function LoginPage(){

    const router=useRouter()
    const [loginform, setLoginform] = useState({
        email: "",
        password: "",
      });
      const [isloading,setIsloading]=useState(false)

      const handleSubmit=async(e:any)=>{
        e.preventDefault()
        try {
          setIsloading(true)
          const response=await axios.post('/api/users/login',loginform)
          console.log(response)
          toast.success("Logged in successfully!")
          router.push('/profile')

          
        } catch (error:any) {
          console.log("error",error)
          toast.error(error.response.data.error)
          
        }
        finally{
          setIsloading(false)
        }

      }

    return(
        <>
        
        <div className="h-screen flex flex-col items-center justify-center bg-zinc-300 ">
        <div className="flex flex-col items-center justify-center pb-5">
          <h1 className="text-sm md:text-2xl text-zinc-800 font-bold">Hurry Up !! You are just a step away..</h1>
          
        </div>
        <form action="" className="flex flex-col px-4 md:px-10 py-4 md:py-6  bg-gray-800 text-gray-300 rounded-md gap-4 text-xs md:text-sm" onSubmit={handleSubmit}>
          <div className="flex gap-2 items-center justify-between ">
            <label htmlFor="email">Email:</label>
            <input type="text" placeholder="Enter your email address" value={loginform.email}  className="bg-gray-600 p-2 rounded-md outline-none" 
            onChange={(e)=>{
                setLoginform({...loginform,email:e.target.value})
            }}/>
          </div>
          <div className="flex gap-2 items-center justify-between ">
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder="Enter your password" value={loginform.password}  className="bg-gray-600 p-2 rounded-md outline-none"
            onChange={(e)=>{
                setLoginform({...loginform,password:e.target.value})
            }} />
          </div>
          <Link href='/signup' className="cursor-pointer hover:text-blue-800 text-xs">Not signed in? Register here</Link>
          <Link href='/forgotPassword' className="cursor-pointer hover:text-blue-800 text-xs">Forgot Password? Click here</Link>
          <button className={`flex justify-center p-2 rounded-md cursor-pointer bg-gray-700 hover:bg-blue-800 ${isloading && 'opacity-50 cursor-not-allowed'}`}>
            {isloading ? "please wait.." :"Login"}
          </button>
        </form>
      </div>
        </>
    )

}

export default LoginPage