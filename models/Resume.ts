import mongoose, { Schema, Document } from "mongoose";

// Define TypeScript Interface
export interface IResume extends Document {
  name: string;
  email: string;
  fileUrl: string;
}

// Define Mongoose Schema
const ResumeSchema = new Schema<IResume>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  fileUrl: { type: String, required: true },
});

// Export Mongoose Model
const Resume = mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);
export default Resume;
