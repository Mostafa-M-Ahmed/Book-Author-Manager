import mongoose from "mongoose";

export const connection_db = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/books-app");
        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to database", error);
    }
}