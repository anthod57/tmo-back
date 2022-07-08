import { userSchema } from './schemas.js';
import dotenv from "dotenv";
import mongoose from "mongoose";

if (process.env.NODE_ENV !== 'production') dotenv.config();

const url = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.w89sd.mongodb.net/tmo?retryWrites=true&w=majority`;

mongoose.connect(url);

mongoose.connection.on("connected", () => {
    console.log("[MONGODB] Successfuly connected.")
});

mongoose.connection.on("disconnected", () => {
    console.log("[MONGODB] Successfuly disconnected.")
});

mongoose.model("User", userSchema);