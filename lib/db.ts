import mongoose, { Connection } from "mongoose";

async function dbConnect(): Promise<Connection> {
    if(mongoose.connection.readyState === 0) {
        const Mongo_URI = process.env.MONGODB_URI;
    
        if(!Mongo_URI) {
            throw new Error("Mongo_URI is not defined in environment variables")
        }

        await mongoose.connect(Mongo_URI)

        console.log("Connected to MongoDB")
    } else {
        console.log("Using existing connection to MongoDB")
    }

    return mongoose.connection;
}

export default dbConnect;