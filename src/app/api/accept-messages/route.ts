import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { acceptMessageSchema } from "@/schema/acceptMessageSchema";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  const userId = user._id;

  try {
  const body = await request.json();
  console.log("body", body);

  const result = acceptMessageSchema.safeParse(body);

  if (!result.success) {
    // If validation fails, return an error response
    return Response.json(
      {
        success: false,
        message: "Invalid input",
        errors: result.error.errors[0].message,
      },
      { status: 400 }
    );
  }

  const { acceptMessages } = result.data;


    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessage: acceptMessages,
      },
      { new: true }
    );

    if (!updatedUser) {
      console.log("update user not found");
      return Response.json(
        {
          success: false,
          message: "failed to update user status for accepting messages.",
        },
        {
          status: 401,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully.",
        updatedUser,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("failed to update user status for accepting messages.");
    return Response.json(
      {
        success: false,
        message: "failed to update user status for accepting messages.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  const userId = user._id;

  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "USer not found.",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessage: foundUser.isAcceptingMessage,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("failed to get udpdated user status", user);
    return Response.json(
      {
        success: true,
        message: "failed to get udpdated user  accepting message status",
      },
      {
        status: 500,
      }
    );
  }
}
