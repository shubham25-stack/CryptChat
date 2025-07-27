import React, { useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {
  
  const [currState,setCurrState] = useState("Sign up")
  const [fullName,setFullName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [bio,setBio] = useState("")
  const [isDataSubmited,setisDataSubmited] = useState(false);

  const onSubmitHandler = (event)=>{
    event.preventDefault();

    if(currState === "Sign up" && !isDataSubmited){
      setisDataSubmited(true)
      return;
    }
  }


  return (
    
      <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
        {/* Left Side */}
        <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]'/>
        {/* Right Side */}
        <form onSubmit={onSubmitHandler}
        className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
          <h2 className='font-medium text-2xl flex justify-between items-center'>
            {currState}
            {isDataSubmited && <img onClick={()=> setisDataSubmited(false)}
             src={assets.arrow_icon} alt="" className='w-5 cursor-pointer'/>
            } 
            </h2>

            {currState === "Sign up" && !isDataSubmited && (
              <input onChange={(e)=>setFullName(e.target.value)} value={fullName} 
              type="text" className='p-2 border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required />
            )}
            
            {!isDataSubmited && (
              <>
              <input onChange={(e)=> setEmail(e.target.value)} value={email}
               type="email" placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>

               <input onChange={(e)=> setPassword(e.target.value)} value={password}
               type="password" placeholder='Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
              </>
            )}

            {
              currState === "Sign up" && isDataSubmited && (
                <textarea onChange={(e)=> setBio(e.target.value)} value={bio}
                 rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide a short bio.' ></textarea>
              )
            }

            {/*submit button bottom*/}
            <button type='submit' className='py-3 bg-gradient-to-r from-orange-700 to orange-600 text-white rounded-md cursor-pointer'>
            {currState === "Sign up" ? "Create Accont" : "Login Now"}
            </button>

            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <input type="checkbox" />
              <p>Agree to the terms of use & privacy policy.</p>
            </div>

            <div className='flex flex-col gap-2'>
              {currState === "Sign up"?(
                <p className='text-sm text-gray-600'>
                    Already have an account? <span onClick={()=> {setCurrState("Login"); setisDataSubmited(false)}} className='font-medium text-orange-500 cursor-pointer'>
                      Login here
                    </span>
                </p>
              ):(
                <p className='text-sm tex-gray-600'>
                  Create an account <span onClick={()=> setCurrState("Sign up")} className='font-medium text-orange-500 cursor-pointer'>Click here</span>
                </p>
              )}
            </div>

        </form>

    </div>
   
  )
}

export default LoginPage
