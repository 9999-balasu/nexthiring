/*"use client";

import { useState } from "react";

export default function CandidateForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    skills: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, skills: formData.skills.split(",") }),
    });
    if (response.ok) {
      alert("Candidate added successfully!");
      setFormData({ name: "", email: "", experience: "", skills: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6 shadow-md w-full space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add Candidate Profile</h2>
      <input type="text" name="name" placeholder="Name" className="border p-2 w-full" onChange={handleChange} value={formData.name} required />
      <input type="email" name="email" placeholder="Email" className="border p-2 w-full" onChange={handleChange} value={formData.email} required />
      <input type="number" name="experience" placeholder="Experience (years)" className="border p-2 w-full" onChange={handleChange} value={formData.experience} required />
      <input type="text" name="skills" placeholder="Skills (comma separated)" className="border p-2 w-full" onChange={handleChange} value={formData.skills} required />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit Profile</button>
    </form>
  );
}*/



"use client";

import { useState } from "react";

export default function CandidateForm({ onCandidateAdded }: { onCandidateAdded: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    skills: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, skills: formData.skills.split(",") }),
    });
    if (response.ok) {
      alert("Candidate added successfully!");
      setFormData({ name: "", email: "", experience: "", skills: "" });

      // Call parent function to refresh candidates list
      onCandidateAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6 shadow-md w-full space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add Candidate Profile</h2>
      <input type="text" name="name" placeholder="Name" className="border p-2 w-full" onChange={handleChange} value={formData.name} required />
      <input type="email" name="email" placeholder="Email" className="border p-2 w-full" onChange={handleChange} value={formData.email} required />
      <input type="number" name="experience" placeholder="Experience (years)" className="border p-2 w-full" onChange={handleChange} value={formData.experience} required />
      <input type="text" name="skills" placeholder="Skills (comma separated)" className="border p-2 w-full" onChange={handleChange} value={formData.skills} required />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit Profile</button>
    </form>
  );
}

