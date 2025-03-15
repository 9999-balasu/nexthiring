import mongoose, { Schema, model, models } from "mongoose";

const RecruiterSchema = new Schema({
  name: String,
  email: String,
  company: String,
  jobPosts: [{ type: Schema.Types.ObjectId, ref: "Job" }],
});

export default models.Recruiter || model("Recruiter", RecruiterSchema);
