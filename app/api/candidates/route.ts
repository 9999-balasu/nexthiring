import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Candidate from "@/models/Candidate";

// GET all candidates
export async function GET() {
  await connectToDB();
  const candidates = await Candidate.find({});
  return NextResponse.json(candidates);
}

// POST a new candidate
export async function POST(req: Request) {
  await connectToDB();
  const candidateData = await req.json();
  const newCandidate = new Candidate(candidateData);
  await newCandidate.save();
  return NextResponse.json(newCandidate, { status: 201 });
}
