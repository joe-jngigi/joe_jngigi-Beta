'use client'

import React, { useState } from 'react'

import Link from 'next/link'
import axios from 'axios'

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';


type u_mail = {
  u_mail: {
    email: string
    username: string
    _id: string
  }
}

type TUserTypes = {
  data :  u_mail
}

const SignUp = () => {

  const router = useRouter()

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    
    try {

      const USER_EXIST: TUserTypes = await axios.post('/api/check-user', {userEmail});

      console.log('Is this working', USER_EXIST.data.u_mail.email);
      

      if (!USER_EXIST.data.u_mail.email) {
        toast.error('User does not Exist');
        (e.target as HTMLFormElement).reset(); 
        // router.replace('/api/auth/sign-up')
        return
      }
  
      const userResponse = await signIn('credentials', {
        userEmail, userPassword, redirect: false, callbackUrl: '/main'
      })

      console.log(userResponse);
      
      if (userResponse?.error) {
        toast.error('Please Check you credentials');

        return
      }

      if (!userResponse?.error) {
        toast.success('User Exists');
        (e.target as HTMLFormElement).reset();
        router.refresh();
        router.replace('/main')
        window.location.assign('/main')
      }

    } catch (error) {
      console.log('Error When Transferring data', error);
      toast.error('Data not transferred. Tell the developer to check his source code.. or else')
    }
    
  }

  return (
    <div className=' w-full p-3 pt-32 flex justify-center items-center '>
      <div className=' shadow-xl border-1 dark:border-none bg-opacity-50 backdrop-blur-md rounded-2xl p-2 w-full md:max-w-[700px] flex items-center justify-center flex-col'>

          <h1 className='text-xl font-bold mb-5'>Sign In</h1>
          
          <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full md:w-[500px]'>
 
            <input required className='search_input' type="email" placeholder='User Email' name='user_email' onChange={(e) => setUserEmail(e.target.value)}/>
            <input required className='search_input' type="password" placeholder='Password' name='user_password' onChange={(e) => setUserPassword(e.target.value)}/>
            
            <span className='pt-5'><button type='submit' className='black_btn float-right'>Sign In</button></span>
          </form>
          {/* {userEmail}
          {userPassword} */}

          <span className='w-full mt-5 text-14 flex flex-col sm:flex-row items-center justify-between px-4 gap-2'>Yoooh! Lets sign you up 😶‍🌫️🫡
            <Link className='underline uppercase text-base font-semibold tracking-wider' href= '/api/auth/sign-up'>Sign Up</Link>
          </span>

      </div>
    </div>
  )
}

export default SignUp
