'use client'
import React from 'react'

import { useSession,signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from '@react-email/components'
import Link from 'next/link'


const Navbar = () => {

    const {data:session} = useSession()

    const user :User = session?.user as User

    

  return (
    <nav className=' py-2 md:px-2 shadow-md  fixed top-0 z-20    shadow-gray-800 w-full bg-black '>
        <div className=' py-2 md:py-1 px-5 mx-auto flex justify-center  sm:justify-between items-center'>
            <h2 className='sm:text-3xl text-2xl  text-white   font-extrabold tracking-wider '>AnonyFeddback</h2>
            <div className='space-x-2 hidden sm:block'>
            {
                session?(
                    <>
                    <span className='mr-4'>Welcome {user.username || user.email}</span>
                    <Button onClick={()=>signOut()} className='w-full md:w-auto cursor-pointer'>LogOut</Button>
                    </>
                ):(
                    <>
                     <Link href='/sign-in' passHref>
                                <button className='px-2 py-2   text-white rounded  transition-colors'>
                                    Login
                                </button>
                            </Link>
                            <Link href='/signup' passHref>
                                <button className='px-2 py-2  text-white rounded  transition-colors'>
                                    Sign Up
                                </button>
                            </Link>
                    </>
                )
            }
            </div>
        </div>
      
    </nav>
  )
}

export default Navbar
