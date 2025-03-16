import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  candidateId: { type: String, required: true },
  jobId: { type: String, required: true },
  status: { type: String, enum: ["Applied", "Under Review", "Interview", "Accepted", "Rejected"], default: "Applied" },
  appliedDate: { type: Date, default: Date.now },
});

const Application = mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
export default Application;
