import React from 'react'
import { HoverEffect } from './ui/card-hover-effect'; // Ensure this path is correct
import {  Shield, User ,Lock, icons} from 'lucide-react';




export const features = [
  {
    title: "Anonymous Feedback",
    description: "Collect feedback without revealing identities.",
    icon: User
  },
  {
    title: "User-Friendly Dashboard",
    description: "View and manage all feedback in one place.",
    icon: Shield
  },
  {
    title: "Secure and Private",
    description: "Your data is safe with us.",
    icon: Lock
  }
];

const Features = () => {
  return (
    <div className='border-b border-slate-800'>

    
    <div className="max-w-5xl mx-auto px-8 py-24 ">
        <h2 className='md:text-3xl text-xl font-bold text-white text-center tracking-wider'>Features</h2>
      <HoverEffect items={features} />
      
    </div>
    </div>
  )
}

export default Features
