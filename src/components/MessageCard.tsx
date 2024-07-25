"use client";
import React from "react";
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
import { X } from "lucide-react";
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
    <Card className="card-bordered">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{message.content}</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>
                <X className="w-5 h-5" />
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
        <div className="text-sm">
          {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default MessageCard;
