"use client";

import { useState } from "react";

export default function JobForm() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("Job added successfully!");
      setFormData({ title: "", company: "", location: "", description: "", salary: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6 shadow-md w-full space-y-4">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <input type="text" name="title" placeholder="Job Title" className="border p-2 w-full" onChange={handleChange} value={formData.title} required />
      <input type="text" name="company" placeholder="Company" className="border p-2 w-full" onChange={handleChange} value={formData.company} required />
      <input type="text" name="location" placeholder="Location" className="border p-2 w-full" onChange={handleChange} value={formData.location} required />
      <textarea name="description" placeholder="Description" className="border p-2 w-full" onChange={handleChange} value={formData.description} required />
      <input type="number" name="salary" placeholder="Salary" className="border p-2 w-full" onChange={handleChange} value={formData.salary} required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Post Job</button>
    </form>
  );
}
