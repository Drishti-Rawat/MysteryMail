import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { SendVerificationEmail } from "@/helpers/SendVerificationEmail";

export async function POST(request: Request) {
  // db connection
  await dbConnect();

  try {
    // fetching username,email and passwrod from request
    const { username, email, password } = await request.json();

    //  find user who exists and cgeck whether user isverified
    const existingUserVerifiedbyUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedbyUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is Already taken",
        },
        {
          status: 400,
        }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exist with this email ",
          },
          { status: 500 }
        );
      } else {
        const hassedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hassedPassword;
        existingUserByEmail.verifyCode = OTP;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);

        await existingUserByEmail.save();
      }
    } else {
      const hassedPassword = await bcrypt.hash(password, 10);
      const expireyDate = new Date();
      expireyDate.setHours(expireyDate.getHours() + 1);

      const newuser = new UserModel({
        username,
        email,
        password: hassedPassword,
        verifyCode: OTP,
        verifyCodeExpiry: expireyDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newuser.save();
    }

    // send verification email
    const emailResponse = await SendVerificationEmail(email, username, OTP);

    if (!emailResponse) {
      return Response.json(
        {
          success: false,
          message: "failed to send verification code",
        },
        { status: 500 }
      );
    } 
    
    
      return Response.json(
        {
          success: true,
          message: "User registered Successfully. Please Verify your email",
        },
        { status: 201 }
      );
    
  } catch (error) {
    // console error
    console.error("Error registering user");

    // error for frontend
    return Response.json(
      {
        success: false,
        message: "Error registering User",
      },
      {
        status: 500,
      }
    );
  }
}
