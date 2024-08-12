import mongoose from 'mongoose';
import ContestData from '../../../../utils/models/contestdata';
import { NextResponse } from 'next/server';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return; 
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

export async function GET(req) {
  await connectToDatabase();

  try {
    const contests = await ContestData.find();
    return NextResponse.json(contests);
  } catch (error) {
    console.error('Error fetching contests:', error);
    return NextResponse.error();
  }
}
export async function POST(req) {
  await connectToDatabase();

  try {
    const { contestid, isStarted } = await req.json();
    
    const updateData = { 
      isStarted, 
      startTime: isStarted ? new Date() : null,
      isFinished: false
    };

    const result = await ContestData.updateOne(
      { contestid },
      { $set: updateData },
      { upsert: true }
    );

    if (result.matchedCount > 0 || result.upsertedCount > 0) {
      return NextResponse.json({ message: 'Contest updated successfully' });
    } else {
      return NextResponse.json({ message: 'Contest not found' });
    }
  } catch (error) {
    console.error('Error updating contest:', error);
    return NextResponse.error();
  }
}
