"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useDebounceValue, useDebounceCallback } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
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
import { signIn, getProviders, useSession } from "next-auth/react";
import { Vortex } from "@/components/ui/vortex";

const SignUppage = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setisCheckingUsername] = useState(false);
  const [isSubmitting, setIssubmitting] = useState(false);
  const [providers, setProviders] = useState<any>({});
  const { status } = useSession();

  // usehook.ts - will be using for debouncing
  const debounced = useDebounceCallback(setUsername, 300);

  const { toast } = useToast();
  const router = useRouter();

  // fetch oauth providers

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      toast({
        title: "Sign-up successful",
        description: "You have been signed up",
        variant: "default",
      });
      router.replace("/dashboard");
    }
  }, [status, toast, router]);

  //  zod implemetation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setisCheckingUsername(true);
        setUsernameMessage("");

        try {
          const response = await axios.get(
            `api/check_username_unique?username=${username}`
          );
          console.log(response);
          setUsernameMessage(response.data.message);
        } catch (error) {
          const AxiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            AxiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setisCheckingUsername(false);
        }
      }
    };

    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIssubmitting(true);

    try {
      console.log("Onsubmit data", data);

      const response = await axios.post("/api/signup", data);

      console.log(response);

      if (response.data.success === true) {
        toast({
          title: "Success",
          description: response.data.message,
        });

        router.replace(`/verify/${username}`);
      }
      setIssubmitting(false);
    } catch (error) {
      console.log("error in signup of user ", error);
      const AxiosError = error as AxiosError<ApiResponse>;
      let errormessage = AxiosError.response?.data.message;

      toast({
        title: "Sign Up failed",
        description: errormessage,
        variant: "destructive",
      });

      setIssubmitting(false);
    }
  };

  return (
    <div className="w-full   h-screen overflow-hidden">
      <Vortex
        backgroundColor="dark"
        rangeY={800}
        particleCount={500}
        baseHue={160}
        className="flex items-center flex-col justify-center   w-full h-full"
      >
        <div className="   ">
          <div className="w-full max-w-md  p-8 space-y-8 bg-[#112f4dcc] text-white  rounded-lg shadow-md">
            <div className="text-center ">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 ">
                Join <span className="text-amber-400">Anonymous</span> Feedback
              </h1>
              <p className="mb-4">Sign Up to start your anounymous adventure</p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black font-semibold focus-visible:ring-cyan-600 outline-none  shadow-sm shadow-cyan-200"
                          placeholder="username"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            debounced(e.target.value);
                          }}
                        />
                      </FormControl>
                      {isCheckingUsername && (
                        <Loader2 className="animate-spin" />
                      )}
                      <p
                        className={`${
                          usernameMessage === "Username is available"
                            ? "text-green-500"
                            : "text-red-500"
                        } text-[12px]`}
                      >
                        {" "}
                        {usernameMessage}
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black font-semibold focus-visible:ring-cyan-600 outline-none  shadow-sm shadow-cyan-200"
                          placeholder="Email"
                          {...field}
                        />
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
                        <Input
                          className="text-black font-semibold focus-visible:ring-cyan-600 outline-none  shadow-sm shadow-cyan-200"
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className=" bg-cyan-400/55 hover:bg-cyan-700/55 transition-colors delay-150 w-full px-3 py-2 "
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" /> Please wait
                    </>
                  ) : (
                    "signup"
                  )}
                </Button>
              </form>
            </Form>

            {/* <div className="text-center mt-2 space-y-3 ">
          <p>Or sign up with:</p>
          <div className="flex justify-center space-x-4">
            {providers?.github && (
              <Button
                onClick={() => signIn(providers.github.id)}
                className="w-full px-3 py-2 bg-blue-600"
              >
                Sign up with GitHub
              </Button>
            )}
            {providers?.google && (
              <Button
                onClick={() => signIn(providers.google.id)}
                className="w-full px-3 py-2 bg-blue-600"
              >
                Sign up with Google
              </Button>
               )}
               </div>
             </div> */}

            <div className="text-center mt-4">
              <p>
                Already a member?{" "}
                <Link
                  href="/sign-in"
                  className="text-amber-400 hover:text-amber-600"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Vortex>
    </div>
  );
};

export default SignUppage;
