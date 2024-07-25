import { resend } from "@/lib/Resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function SendVerificationEmail(email:string,username:string,verifycode:string):Promise<ApiResponse> {
 
    const testingEmail = "pythoncode48@gmail.com";
    console.log("Preparing to send email to:", email,verifycode,username);
    try {

        const emailResponse = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: testingEmail,
            subject: 'AnonymousFeedback | Verification code',
            react: VerificationEmail({username:username,otp:verifycode}),
          });

          console.log("Email response:", emailResponse);

        return {success:true,message:"verification email sent successfully"}
        
    } catch (emailerror) {
     
        console.error("Error sending Verification email",emailerror)
        return {success:false,message:"failed to send  verification email"}
    }
}