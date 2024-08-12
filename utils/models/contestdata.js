import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  initialCode: {
    type: String,
    required: true,
  },
  fixedCode: {
    type: String,
    required: true,
  },
  bugDescriptions: {
    type: [String],
    required: true,
  }
});

const contestDataSchema = new mongoose.Schema({
  contestid: {
    type: String,
    required: true,
    unique: true,
  },
  questions: {
    type: [questionSchema],
    required: true,
  },
  isStarted: {
    type: Boolean,
    default: false,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  startTime: { 
    type: Date, 
    default: null 
  },
});

const ContestData =
  mongoose.models.contestdata ||
  mongoose.model("contestdata", contestDataSchema);

export default ContestData;
