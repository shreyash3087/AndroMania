import mongoose from 'mongoose';
import ContestData from '../../../../../utils/models/contestdata';
import { NextResponse } from 'next/server';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return; 
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

export async function GET(req, { params }) {
  await connectToDatabase();

  const { id } = params; 

  try {
    const contest = await ContestData.findOne({ contestid: id });

    if (!contest) {
      return NextResponse.json({ message: 'Contest not found' }, { status: 404 });
    }

    return NextResponse.json(contest);
  } catch (error) {
    console.error('Error fetching contest:', error);
    return NextResponse.error();
  }
}
export async function POST(req, { params }) {
  await connectToDatabase();

  const { id } = params; // Get the contest ID from the URL parameters
  const { isStarted, isFinished } = await req.json(); // Get the data from the request body

  try {
    // Use $set to update only the specific fields without affecting the rest of the document
    const result = await ContestData.updateOne(
      { contestid: id },
      { $set: { isStarted, isFinished } }
    );

    if (result.nModified === 0) {
      return NextResponse.json({ message: 'Contest not found or already up-to-date' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Contest status updated successfully' });
  } catch (error) {
    console.error('Error updating contest status:', error);
    return NextResponse.error();
  }
}
