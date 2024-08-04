import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

/**
 * Global is used to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 */
if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (global.mongoose.conn) {
        return global.mongoose.conn;
    }

    if (!global.mongoose.promise) {
        const opts = {
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        global.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    global.mongoose.conn = await global.mongoose.promise;
    return global.mongoose.conn;
}

export default dbConnect;
