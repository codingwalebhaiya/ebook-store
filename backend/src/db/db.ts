import mongoose from "mongoose";
import { config } from "../config/config";


const connectDB = async () =>{
   try {
      mongoose.connection.on("connected", () => {
         console.log("MongoDB connected Successfully");
         
      })

      mongoose.connection.on("error", (err) => {
         console.log("Error in connecting to database", err);
         
      })

      await mongoose.connect(config.databaseUrl as string)

   } catch (err) {
      console.log("MongoDB connection Failed !!", err);
      
   }
}

export default connectDB;

