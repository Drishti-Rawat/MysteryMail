"use client";
import React, { useRef } from "react";
import dayjs from 'dayjs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { Delete, Trash, X } from "lucide-react";
import { Message } from "@/model/User";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";



type MessageCardProp = {
    message: Message;
    onMessageDelete : (messageId: string)=> void;
   
    
}



const MessageCard = ({message,onMessageDelete}:MessageCardProp) => {


    const {toast} = useToast()

    const handleDelteConfirm= async ()=>{

      try {
         const response =  await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
         console.log(response)
         if(response.data.success===true){
          toast({
              title:response.data.message,
          })
  
          
         }
         onMessageDelete(message._id as string )
      } catch (error) {
        
      }

    }

  return (

    <Card className="card-bordered shadow-xl py-5  bg-[#e6dfdf]">
       <CardContent>
        <div className="flex justify-between items-center ">
          <CardDescription className="sm:text-lg text-[15px] ">{message.content}</CardDescription>
         
        </div>
        </CardContent>

        <CardFooter>
        <div className="text-sm w-full flex justify-between items-center">
         <div className=" text-[12px]">{dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}</div> 
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="">
               <Trash className="h-4 w-4"/>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDelteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        </CardFooter>
     
    </Card>
  );
};

export default MessageCard;
