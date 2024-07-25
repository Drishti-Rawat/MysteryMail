import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

// initally connection of type connection  object will be empty becz isConnected is not surely number
const connection : ConnectionObject = {}

// databases connection
 async function dbConnect() : Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to databases")
        return
    }

    try {
       const db = await mongoose.connect(process.env.MONGO_URL! || "" ,{})
    //    console.log(db)
    //    console.log(db.connections)

       connection.isConnected = db.connections[0].readyState

       console.log("db connected successfully")
    } catch (error) {
        console.log("Database connection failed",error)
        process.exit(1)
        
    }
    
 }

 export default dbConnect