import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Job from "@/models/Job";

// GET all jobs
export async function GET() {
  await connectToDB();
  const jobs = await Job.find({});
  return NextResponse.json(jobs);
}

// POST a new job
export async function POST(req: Request) {
  await connectToDB();
  const jobData = await req.json();
  const newJob = new Job(jobData);
  await newJob.save();
  return NextResponse.json(newJob, { status: 201 });
}
