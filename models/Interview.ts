import mongoose, { Schema, Document } from "mongoose";

export interface IInterview extends Document {
  candidateId: mongoose.Types.ObjectId;
  recruiterId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  scheduledTime: Date;
  status: "scheduled" | "completed" | "cancelled";
  meetingLink?: string;
  notes?: string;
}

const InterviewSchema = new Schema<IInterview>(
  {
    candidateId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recruiterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    scheduledTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    meetingLink: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Interview || mongoose.model<IInterview>("Interview", InterviewSchema);
