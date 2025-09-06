import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async () => {
    try {

        mongoose.connection.on('connected', ()=> console.log('Database Connected'));

        await mongoose.connect(`${process.env.MONGODB_URI}/cryptChat`)
    } catch (error) {
        console.log(error);
    }
}