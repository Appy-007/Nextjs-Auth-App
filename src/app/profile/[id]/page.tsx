/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"


function UserPage(){
    const motivationArray=["It is easy to get caught up in what you still dont know, but take a moment to recognize how far you ve come. Completing a project, solving a tough bug, or even learning a new concept are all victories. Take pride in your progress—no matter how small it seems.",
        " trust in your ability to grow and succeed. Software development is a journey that takes time and patience. Believe that you are capable, and dont let self-doubt hold you back. Every line of code you write is a step toward becoming the developer you want to be.",
        "Burnout is real. Working too hard without taking breaks will only slow you down in the long run. Ensure you maintain a healthy work-life balance. Take breaks, sleep well, and engage in hobbies or activities outside of coding. A fresh mind will always come up with better solutions.",
        "Everyones journey is unique. It is easy to get caught up in comparing yourself to others, especially when you see peers who seem to know everything. Focus on your own progress and growth, and remember that learning is a personal experience. Celebrate the milestones you hit, no matter how small they seem.",
        "Software development is a constant learning process. Dont feel discouraged if things seem overwhelming at first—every new concept is an opportunity to grow. Learn from your mistakes, ask questions, and never stop exploring. The more you learn, the more confident you wll become.",

    ]

    const [para,setPara]=useState('')
    

    

    const generateRandomString=()=>{
        const arrsize:number=motivationArray.length
        const randomNum:number=Math.floor( Math.random()*arrsize)
        setPara(motivationArray[randomNum])


    }
    return(
        <>
        <div className="h-screen bg-zinc-300 flex flex-col gap-6 justify-center items-center">
            
            <div className="flex flex-col items-center justify-center pb-5">
            <h1 className="text-sm md:text-lg text-zinc-600 font-semibold text-center pb-2">Thank You so much for making up to here</h1>
            {para.length==0 && (<button onClick={generateRandomString} className="bg-green-500 hover:bg-green-700 text-white rounded-md p-2 cursor-pointer">See your gift</button>)} 
            {para.length>0 && (
            <div><h1 className="text-sm md:text-lg text-zinc-600 font-semibold text-center pb-2 px-4">{para}</h1>
            <h1 className="text-sm md:text-lg text-zinc-600 text-center pb-2 px-4">Just a small present to help you feel good.. </h1>
            </div>
            )}

            </div>
        </div>
        </>

    )
}

export default UserPage