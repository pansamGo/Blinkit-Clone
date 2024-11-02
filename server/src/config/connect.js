// To import a library instead of require as we do in express
// add "type": module in package.json and install one npm package with command "npm install tslib"
// tslib helps fastify to identify import keyword 
import mongoose from "mongoose";

export const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log('Database connected.');
    } catch (error) {
        console.log("Database error: ", error);
    }
}