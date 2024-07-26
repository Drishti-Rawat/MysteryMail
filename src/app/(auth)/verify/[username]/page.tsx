'use client'
import { useToast } from '@/components/ui/use-toast'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { verifySchema } from '@/schemas/verifySchema';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const page = () => {
  const [isSubmitting, setIssubmitting] = useState(false);
  const router = useRouter()
  const param = useParams<{username:string}>()
  console.log(param.username)
  const {toast} = useToast()

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues:{
      code:""
    }
    
  });

  console.log('onsubmit is about to start')


  const onSubmit = async (data: z.infer<typeof verifySchema>)=>{
    console.log("onSubmit called");
  console.log("data", data.code);
  console.log("username", param.username);
    
    setIssubmitting(true)
    try {

      
      const response = await axios.post('/api/Verifycode',{username:param.username , code:data.code})

      console.log("response",response)

      toast({
        title:"success",
        description:response.data.message
      })

     setIssubmitting(false)
      router.replace("/sign-in")
    } 
    catch (error) {
      console.log("error in signup of user ", error);
      const AxiosError = error as AxiosError<ApiResponse>;
      let errormessage = AxiosError.response?.data.message;

      toast({
        title: "Sign Up failed",
        description: errormessage,
        variant: "destructive",
      });

      setIssubmitting(false)
      router.replace("/signup")
    }
    }

  


  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 '>Verify Your Account </h1>
          <p className='mb-4'>Enter the verification code sent to your email</p>

        </div>

        


{/* <Form {...form}>
  <form onSubmit={(e)=>{e.preventDefault()
      console.log('Form submitted')
      
      console.log('Form values:', form.getValues());
      console.log('Form errors:', form.formState.errors);
      form.handleSubmit(onSubmit)}} className='space-y-6'>
  <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field}  />
                  </FormControl>
                 
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} onClick={() => {
    console.log('Button clicked');
    console.log('Form state:', form.formState);
  }} className="  w-full px-3 py-2 ">
              Verify
            </Button>
          
  </form>

</Form> */}

<Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
           
           
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input  placeholder="Code" {...field}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="  w-full px-3 py-2 ">
              {
            isSubmitting?(<><Loader2 className="animate-spin"/> Please wait</>):("signup")
            }
            </Button>
          </form>
        </Form>



        

      </div>
    </div>
  );
}

export default page
