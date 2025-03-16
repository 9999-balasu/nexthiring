import { NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongodb";
import Application from "@/models/Application";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { jobId } = await req.json();
    // In a real application, candidateId would come from session/authentication.
    const candidateId = "candidate-placeholder-id"; 
    const newApplication = new Application({ candidateId, jobId, status: "Applied" });
    await newApplication.save();
    return NextResponse.json({ message: "Application submitted successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error applying for job:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const applications = await Application.find();
    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
