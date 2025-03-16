/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";

function SignupPage() {
  const [signupform, setSignupform] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isloading,setIsloading]=useState(false)

  const router=useRouter()

  const handleSignup=async(e:any)=>{
    e.preventDefault()
    try {
      setIsloading(true)
      const response=await axios.post('/api/users/signup',signupform)
      console.log(response)
      router.push('/login')
      

      
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
        <div className="flex flex-col items-center justify-center pb-5">
          <h1 className="text-sm md:text-2xl text-zinc-800 font-bold">A surprise is waiting for you..</h1>
          <h1 className="text-sm md:text-2xl text-zinc-800 font-bold">Sign Up to see now</h1>
        </div>
        <form action="" className="flex flex-col px-4 md:px-10 py-4 md:py-6  bg-gray-800 text-gray-300 rounded-md gap-4 text-xs md:text-sm" onSubmit={handleSignup}>
          <div className="flex gap-2 items-center justify-between ">
            <label htmlFor="username">Username:</label>
            <input type="text" placeholder="Enter your name" value={signupform.username} className="bg-gray-600 p-2 rounded-md outline-none" 
            onChange={(e)=>{
                setSignupform({...signupform,username:e.target.value})
            }}/>
          </div>
          <div className="flex gap-2 items-center justify-between ">
            <label htmlFor="email">Email:</label>
            <input type="text" placeholder="Enter your email address" value={signupform.email}  className="bg-gray-600 p-2 rounded-md outline-none" 
            onChange={(e)=>{
                setSignupform({...signupform,email:e.target.value})
            }}/>
          </div>
          <div className="flex gap-2 items-center justify-between ">
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder="Enter your password" value={signupform.password}  className="bg-gray-600 p-2 rounded-md outline-none"
            onChange={(e)=>{
                setSignupform({...signupform,password:e.target.value})
            }} />
          </div>
          <Link href='/login' className="cursor-pointer hover:text-blue-800 text-xs">Already Logged in?</Link>
          <button className={`flex justify-center p-2 rounded-md cursor-pointer bg-gray-700 hover:bg-blue-800 ${isloading && 'opacity-50 cursor-not-allowed'}`}>
            {isloading ? "signing.." :"Sign up"}
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupPage;
