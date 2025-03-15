import mongoose, { Schema, model, models } from "mongoose";

const CandidateSchema = new Schema({
  name: String,
  email: String,
  skills: [String],
  experience: Number,
  resumeUrl: String,
});

export default models.Candidate || model("Candidate", CandidateSchema);
