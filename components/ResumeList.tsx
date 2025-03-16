"use client";

import { useState, useEffect } from "react";

interface Resume {
  _id: string;
  name: string;
  email: string;
  resumeUrl: string;
}

export default function ResumeList() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResumes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/resumes", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch resumes");

      const data: Resume[] = await res.json();
      setResumes(data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      setError("Failed to load resumes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  if (loading) return <p>Loading resumes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (resumes.length === 0) return <p>No resumes uploaded yet.</p>;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Uploaded Resumes</h3>
      <ul className="border rounded p-4">
        {resumes.map((resume) => (
          <li key={resume._id} className="mb-2">
            <strong>{resume.name}</strong> ({resume.email}) - 
            <a
              href={resume.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline ml-2"
            >
              View Resume
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
