"use client";

import { useState } from "react";

export interface CandidateProfile {
  name: string;
  email: string;
  experience: number;
  skills: string; // Comma-separated string; you can split it later if needed.
}

export default function CandidateProfileForm() {
  const [profile, setProfile] = useState<CandidateProfile>({
    name: "",
    email: "",
    experience: 0,
    skills: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("/api/candidate/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage("Profile saved successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-2xl font-bold mb-4">Candidate Profile</h2>
      {message && <p className="text-green-500 mb-2">{message}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={profile.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="experience"
          placeholder="Years of Experience"
          value={profile.experience}
          onChange={(e) => setProfile({ ...profile, experience: Number(e.target.value) })} 
          className="border p-2 w-full"
          required
        />
        <textarea
          name="skills"
          placeholder="Skills (comma separated)"
          value={profile.skills}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save Profile
        </button>
      </form>
    </div>
  );
}
