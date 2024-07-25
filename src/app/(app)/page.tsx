'use client'
import * as React from "react"

import { Hero } from "@/components/Hero"
import WhyChooseUse from "@/components/WhyChooseUse"
import Features from "@/components/Features"
import Testimonials from "@/components/Testimonials"



 

export default function Home() {
  return (
    <main className=" min-h-screen flex flex-col z-10 bg-black ">

      <Hero/>

<WhyChooseUse/>

<Features/>

<Testimonials/>
      
     



    </main>
  );
}
