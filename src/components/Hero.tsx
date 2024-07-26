"use client";

import { TypewriterEffect } from "./ui/typewriter-effect";

import { LampContainer } from "./ui/lamp";
import { motion, useScroll } from "framer-motion";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { useRef } from "react";

export function Hero() {
  

  const words = [
    {
      text: "Share",
    },
    {
      text: "Your",
    },
    {
      text: "Feedback",
    },
    {
      text: "Anonymously",
      className: "text-amber-400  dark:text-amber-500",
    },
  ];
  return (
    <div
      className="h-[70vh] md:h-[90vh] lg:h-[100vh] overflow-hidden border-b border-slate-800 " 
     
      >
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br from-slate-300 sm:px-10   md:px-0 to-slate-500 bg-clip-text   text-center  font-medium tracking-normal text-transparent "
      >
        <div className="flex flex-col items-center justify-center space-y-16      ">
          <div className="flex flex-col items-center justify-center  gap-7   ">
            <p className="text-white dark:text-neutral-200 text-[12px] text-center  sm:text-sm md:text-lg  ">
              Your voice matters. Share your thoughts without revealing your
              identity.
            </p>
            <TypewriterEffect words={words} />
          </div>

          <div className="     ">
            <HoverBorderGradient
              containerClassName="rounded-lg "
              as="button"
              className="dark:bg-black bg-[#050c17] px-6  md:px-10 py-2.5 text-sm text-white dark:text-white flex items-center space-x-2"
            >
              Get Started
            </HoverBorderGradient>
          </div>
        </div>
      </motion.h1>
    </LampContainer>
    </div>
  );
}
