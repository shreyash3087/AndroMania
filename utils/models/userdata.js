import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  member1: { type: String, required: true },
  member2: { type: String, default: "" },
  member3: { type: String, default: "" },
  contestId: { type: String, required: true },
  score: { type: Number, default: 0 }, 
});

const UserData = mongoose.models.usercollection || mongoose.model("usercollection", userSchema);

export default UserData;
