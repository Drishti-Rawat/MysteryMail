import { z } from "zod";

export const usernameValidation = z.
string()
.min(2,"Username must be atleast 3 characters")
.max(20, "Username must be no more then 20 characters")
.regex(/^[a-zA-Z0-9_]+$/
    ,"Username must not contain special character")
;

export const signUpSchema = z.object({
    username : usernameValidation,
    email : z.string().email({message:"Invalid Email address"}),
    password : z.string().min(6,"Password must contain atleast 6 characters.")

})
