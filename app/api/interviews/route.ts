import { NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongodb";
import Interview from "@/models/Interview";

export async function GET() {
  await connectToDB();
  try {
    const interviews = await Interview.find().populate("candidateId recruiterId", "name");
    return NextResponse.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error); // ✅ Now error is used
    return NextResponse.json({ message: "Error fetching interviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const newInterview = await Interview.create(body);
    return NextResponse.json(newInterview, { status: 201 });
  } catch (error) {
    console.error("Error creating interview:", error); // ✅ Now error is used
    return NextResponse.json({ error: "Failed to create interview" }, { status: 500 });
  }
}
