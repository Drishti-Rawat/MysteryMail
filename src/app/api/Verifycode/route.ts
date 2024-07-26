import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import {z} from 'zod'
import { verifySchema } from "@/schema/verifySchema";

export async function POST(request:Request) {


    
    await  dbConnect()

    try {
       const {username,code} = await request.json()
       console.log(username,code)

       const decodeUsername = decodeURIComponent(username)
       const user = await UserModel.findOne({username:decodeUsername})

       if(!user){
        console.log("user not found")
        return Response.json({
            success:false,
            message:"User not found"
        },{status:500})
       }

       const iscodeValid =  user.verifyCode===code
       const iscodenotExpired = user.verifyCodeExpiry>new Date

       if(iscodeValid && iscodenotExpired){
        console.log("user verified")
       user.isVerified = true
       await user.save()
       return Response.json({
            success:true,
            message:"User verified successfully"
        },{status:200})
       }
       else if(!iscodenotExpired){
        console.log("Verification code expired")
        return Response.json({
            success:false,
            message:"Verification code has expired, Please sign up again"
        },{status:400})
       }
       else{
        console.log("Incorrect Verification Code")
        return Response.json({
            success:false,
            message:"Incorrect Verification Code"
        },{status:400})
       }
        
    } catch (error) {
        console.log("error verifying User",error)

        return Response.json({
            success:false,
            message:"error verifying user"
        },{status:500})
    }
}