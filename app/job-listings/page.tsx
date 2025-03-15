import Job from "@/models/Job";
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
