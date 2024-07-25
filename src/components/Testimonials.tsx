import React from 'react'
import messages from '@/Data/Messages.json'
import Autoplay from 'embla-carousel-autoplay'
 
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel"

const Testimonials = () => {
  return (
     <div className="flex bg-gradient-to-br px-8 overflow-hidden from-black via-black to-blue-900 flex-col justify-center items-center py-20 text-white">

      <section className="text-center mb-8 md:mb-12 mt-14">
        <h1 className="sm:text-3xl text-xl md:text-5xl font-bold ">Dive into the world Of Anonymous Conversastion </h1>
        <p className="mt-3 md:mt-4 text-[14px] md:text-lg ">Explore Anonymous Feedback - Where Your identity remains a secret</p>
      </section>

      <Carousel 
      plugins={[Autoplay({delay:1500})]}
      className="w-full max-w-sm md:max-w-md lg:max-w-lg  mt-10 ">
      <CarouselContent className="">
       {
        messages?(
          messages.map((message,index)=>(
            <CarouselItem key={index} className=" ">
            <div className="p-1   ">
              <Card  className="bg-black text-white outline-none border border-gray-900 shadow-sm shadow-cyan-100 ">
                <CardHeader className='sm:text-base  text-[13px]' >{message.title}</CardHeader>
                <CardContent className="flex flex-col  gap-6  items-center justify-center p-6">
                  <span className="sm:text-xl text-base font-semibold px-4">{message.content}</span>
                </CardContent>
                <CardFooter className='text-sm'>{message.received}</CardFooter>
              </Card>
            </div>
          </CarouselItem>
          ))
        ):(
          <h2>No messages</h2>
        )
       }
      </CarouselContent>
      
    </Carousel>
    </div> 
  )
}

export default Testimonials
