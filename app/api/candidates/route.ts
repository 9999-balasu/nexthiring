/*import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Candidate from "@/models/Candidate"; // ✅ Use this for default export



export async function POST(req: Request) {
  try {
    const { name, email, skills } = await req.json();
    await connectToDB();

    const newCandidate = new Candidate({ name, email, skills: skills.split(",") });
    await newCandidate.save();

    return NextResponse.json({ message: "Candidate added successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error saving candidate" }, { status: 500 });
  }
}*/


import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Candidate from "@/models/Candidate"; // ✅ Use this for default export

interface CandidateData {
  name: string;
  email: string;
  skills: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, skills }: CandidateData = await req.json();
    await connectToDB();

    const newCandidate = new Candidate({ name, email, skills: skills.split(",") });
    await newCandidate.save();

    return NextResponse.json({ message: "Candidate added successfully!" }, { status: 201 });
  } catch (error) {
    // We can add more specific error handling here if necessary
    console.error("Error saving candidate:", error);
    return NextResponse.json({ message: "Error saving candidate" }, { status: 500 });
  }
}

