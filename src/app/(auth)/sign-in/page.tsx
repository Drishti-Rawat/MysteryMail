"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
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
import { signInSchema } from "@/schemas/signInSchema";
import { signIn , getProviders, useSession } from "next-auth/react";

const page = () => {
  const [providers, setProviders] = useState<any>({});
const {status} = useSession()
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProviders();
        console.log("Raw providers response:", res);
        setProviders(res || {});
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("Providers state:", providers);
  }, [providers]);


  useEffect(() => {
    if (status === 'authenticated') {
      toast({
        title: "Login successful",
        description: "You have been logged in",
        variant: "default"
      });
      router.replace('/dashboard');
    }
  }, [status, toast, router]);
  //  zod implemetation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
   
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    console.log("sign in result : ",result)

    if(result?.error){
      if(result.error==='CredentialsSignin'){
      toast({
        title:"Login failed",
        description:"Incorrect Name or Password",
        variant:"destructive"
      })
    }
    else{
      toast({
        title:"Login failed",
        description:"Incorrect Name or Password",
        variant:"destructive"
      })
    }
    }

    if(result?.url){
      router.replace('/dashboard')
    }
   

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Anonymous Feedback
          </h1>
          <p className="mb-4">Sign In to start your anounymous adventure</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Email/Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              
              className="  w-full px-3 py-2 "
            >
              Signin
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>Or sign in with:</p>
          <div className="flex justify-center space-x-4 mt-4">
            {providers.github && (
              <Button
                onClick={() => signIn(providers.github.id)}
                className="bg-black text-white"
              >
                GitHub
              </Button>
            )}
            {providers.google && (
              <Button
                onClick={() => signIn(providers.google.id)}
                className="bg-red-500 text-white"
              >
                Google
              </Button>
            )}
          </div>
        </div>
        <div className="text-center mt-4">
          <p>
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-800">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
