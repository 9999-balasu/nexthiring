/*import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectToDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectToDB();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}*/



import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";

import { connectToDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  await connectToDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });
  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("token", token, { httpOnly: true, maxAge: 86400 });
  return response;
}