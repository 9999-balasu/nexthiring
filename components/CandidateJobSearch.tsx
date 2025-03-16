"use client";

import { useState, useEffect } from "react";
import { Job } from "@/types/job"; // Assume you have this type defined

export default function CandidateJobSearch() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data: Job[] = await res.json();
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs by title and location
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    job.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  const handleApply = async (jobId: string) => {
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });
      if (!res.ok) throw new Error("Failed to apply for job");
      alert("Job application submitted successfully!");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Unknown error applying for job");
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4">Job Search</h2>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search jobs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border p-2 flex-1"
        />
      </div>
      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredJobs.map((job) => (
            <li key={job._id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p>{job.company} - {job.location}</p>
              <p>{job.description}</p>
              <button
                onClick={() => handleApply(job._id)}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
              >
                Apply
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
