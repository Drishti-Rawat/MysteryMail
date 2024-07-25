'use client'
import * as React from "react"
import messages from '@/Data/Messages.json'
import Autoplay from 'embla-carousel-autoplay'
 
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center  px-4 md:px-5 py-6 bg-gray-100 h-screen ">
      <section className="text-center mb-8 md:mb-12 mt-14">
        <h1 className="text-3xl md:text-5xl font-bold ">Dive into the world Of Anonymous Conversastion </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg ">Explore Anonymous Feedback - Where Your identity remains a secret</p>
      </section>

      <Carousel 
      plugins={[Autoplay({delay:2000})]}
      className="w-full max-w-lg">
      <CarouselContent className="">
       {
        messages?(
          messages.map((message,index)=>(
            <CarouselItem key={index} className=" ">
            <div className="p-1  ">
              <Card  className="">
                <CardHeader>{message.title}</CardHeader>
                <CardContent className="flex flex-col  gap-6  items-center justify-center p-6">
                  <span className="text-xl font-semibold px-4">{message.content}</span>
                </CardContent>
                <CardFooter>{message.received}</CardFooter>
              </Card>
            </div>
          </CarouselItem>
          ))
        ):(
          <h2>No messages</h2>
        )
       }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    </main>
  );
}
