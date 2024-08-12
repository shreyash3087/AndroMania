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

export async function GET() {
  await connectToDatabase();

  try {
    const users = await UserData.find();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
}

export async function POST(req) {
  await connectToDatabase();

  try {
    const { teamName, member1, member2, member3, contestId } = await req.json();

    const newUser = new UserData({
      teamName,
      member1,
      member2,
      member3,
      contestId,
      score: 0, // default score
    });

    await newUser.save();

    return NextResponse.json({ message: "User data saved successfully" });
  } catch (error) {
    console.error("Error saving user data:", error);
    return NextResponse.error();
  }
}
