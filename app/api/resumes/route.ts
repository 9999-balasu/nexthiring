import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public/uploads");

// Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureUploadDir();

    const formData = await req.formData();
    const file = formData.get("resume") as File | null;
    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;

    if (!file || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json(
      { message: "Resume uploaded successfully!", resume: { name, email, resumeUrl: fileUrl } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading resume:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ensureUploadDir();
    const files = await fs.readdir(uploadDir);

    const resumes = files.map((fileName) => ({
      _id: fileName.split("_")[0], // Using timestamp as ID
      name: fileName.split("_").slice(1).join("_"),
      email: "Unknown",
      resumeUrl: `/uploads/${fileName}`,
    }));

    return NextResponse.json(resumes, { status: 200 });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
