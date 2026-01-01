import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDb =  ()=>{
    return mongoose
  .connect(process.env.MONGODB_CONN, { 
    dbName: "Babua_ka_db",
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
}