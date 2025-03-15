




"use client"; // Required for client-side fetching

import { useEffect, useState } from "react";

export default function JobListings() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <div className="border rounded-lg p-6 shadow-md w-full">
      <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
      {jobs.length > 0 ? (
        jobs.map((job: any) => (
          <div key={job._id} className="border-b py-4">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.company} - {job.location}</p>
            <p>{job.description}</p>
            <p className="text-sm text-gray-500">Salary: ${job.salary}</p>
          </div>
        ))
      ) : (
        <p>No job listings available.</p>
      )}
    </div>
  );
}
