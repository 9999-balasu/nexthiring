/*import Job from "@/models/Job";
import { connectToDB } from "@/lib/mongodb";

export default async function JobListings() {
  await connectToDB();
  const jobs = await Job.find({});

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      {jobs.map((job: any) => (
        <div key={job._id} className="border p-4 mb-4">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p>{job.description}</p>
          <p className="text-gray-500">{job.company}</p>
        </div>
      ))}
    </div>
  );
}
*/


/*import Job from "@/models/Job";
import { connectToDB } from "@/lib/mongodb";

interface JobType {
  _id: string;
  title: string;
  description: string;
  company: string;
}

export default async function JobListings() {
  await connectToDB();
  
  // ✅ Ensure correct type is used
  const jobs: JobType[] = await Job.find({}).lean<JobType[]>();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job._id} className="border p-4 mb-4">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p>{job.description}</p>
            <p className="text-gray-500">{job.company}</p>
          </div>
        ))
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
}*/
import { Job } from "@/types/job";
import { useEffect, useState } from "react";

export default function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data: Job[] = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.company} - {job.location}</p>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
