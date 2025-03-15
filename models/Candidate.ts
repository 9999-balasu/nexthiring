/*import mongoose, { Schema, model, models } from "mongoose";

const CandidateSchema = new Schema({
  name: String,
  email: String,
  skills: [String],
  experience: Number,
  resumeUrl: String,
});

export default models.Candidate || model("Candidate", CandidateSchema);*/


import { Schema, model, models } from "mongoose";

const CandidateSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: { type: [String], required: true },
});

// Ensure the model is created only once
const Candidate = models.Candidate || model("Candidate", CandidateSchema);

export default Candidate; // ✅ Default export

