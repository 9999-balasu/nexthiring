/*import { NextResponse } from "next/server";
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
*/

import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Job from "@/models/Job";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { title, company, location, description } = await req.json();

    if (!title || !company || !location || !description) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newJob = new Job({ title, company, location, description });
    await newJob.save();

    return NextResponse.json({ message: "Job posted successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error posting job:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const jobs = await Job.find({});
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
