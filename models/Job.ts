/*import mongoose, { Schema, model, models } from "mongoose";

const JobSchema = new Schema({
  title: String,
  description: String,
  company: String,
  location: String,
  salary: Number,
  postedAt: { type: Date, default: Date.now },
});

export default models.Job || model("Job", JobSchema);*/



/*import mongoose, { Schema, model, models } from "mongoose";

// Ensure models object exists
const existingJobModel = models ? models.Job : undefined;

// Define the Job schema
const JobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  postedAt: { type: Date, default: Date.now },
});

// ✅ Ensure model is created only once
const Job = existingJobModel || model("Job", JobSchema);

export default Job;*/



import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  description: string;
}

const JobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
});

const Job = models.Job || model<IJob>("Job", JobSchema);
export default Job;


