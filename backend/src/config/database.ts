import mongoose from 'mongoose';



const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/taskqueue';


const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;