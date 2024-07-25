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
    <nav className='p-4 md:p-6 shadow-md'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
            <h2 className='text-xl font-bold mb-4 md:mb-0'>AnonyFeddback</h2>
            <div className='space-x-4'>
            {
                session?(
                    <>
                    <span className='mr-4'>Welcome {user.username || user.email}</span>
                    <Button onClick={()=>signOut()} className='w-full md:w-auto cursor-pointer'>LogOut</Button>
                    </>
                ):(
                    <>
                     <Link href='/sign-in' passHref>
                                <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'>
                                    Login
                                </button>
                            </Link>
                            <Link href='/signup' passHref>
                                <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'>
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
