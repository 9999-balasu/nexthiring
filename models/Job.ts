import mongoose, { Schema, model, models } from "mongoose";

const JobSchema = new Schema({
  title: String,
  description: String,
  company: String,
  location: String,
  salary: Number,
  postedAt: { type: Date, default: Date.now },
});

export default models.Job || model("Job", JobSchema);
