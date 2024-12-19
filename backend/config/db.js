import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // Connect to the MongoDB database without deprecated options
        await mongoose.connect('mongodb+srv://Disarray:223001112@cluster0.uadsh.mongodb.net/player-lagbe');
        console.log("DB connected successfully");
    } catch (error) {
        console.error("DB connection failed:", error);
    }
};
