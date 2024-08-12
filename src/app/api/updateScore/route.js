import mongoose from "mongoose";
import UserData from "../../../../utils/models/userdata";
import { NextResponse } from "next/server";

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

export async function POST(req) {
  await connectToDatabase();

  try {
    const { teamName, score } = await req.json();

    if (!teamName || typeof score !== 'number') {
      return NextResponse.json({ error: "Team name and score are required" }, { status: 400 });
    }

    const user = await UserData.findOne({ teamName });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.score += score; 
    await user.save();

    return NextResponse.json({ message: "Score updated successfully" });
  } catch (error) {
    console.error("Error updating score:", error);
    return NextResponse.error();
  }
}
