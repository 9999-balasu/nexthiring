"use client";

import { useState } from "react";

export default function ResumeUploadForm({ onUpload }: { onUpload: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume || !name || !email) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("resume", resume);

      const res = await fetch("/api/resumes", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Upload failed");

      setSuccess("Resume uploaded successfully!");
      setName("");
      setEmail("");
      setResume(null);
      onUpload(); // Refresh the resume list
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResume(e.target.files?.[0] || null)}
        className="border p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? "Uploading..." : "Upload Resume"}
      </button>
    </form>
  );
}
