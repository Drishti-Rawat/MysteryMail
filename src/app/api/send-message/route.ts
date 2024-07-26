import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";
import { MessagesSchema } from "@/schema/messageSchema";

export async function POST(request: Request) {
  await dbConnect();

  try {
   
    const { username ,content} = await request.json();

    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // is user accepting the message
    const isAcceptingMessage = user?.isAcceptingMessage;

    if (!isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting the messages",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };

    user.messages.push(newMessage as Message)

    await user.save()

    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 201 }
    );
  } catch (error) {

    console.log("Error aiding messages" , error)

    return Response.json(
        {
          success: true,
          message: "Internal Server Error",
        },
        { status: 201 }
      );
  }
}
