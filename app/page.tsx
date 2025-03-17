










"use client";

import { useState, useEffect } from "react";
import JobForm from "@/components/JobForm";
import JobListings from "@/components/JobListings";
import ResumeUploadForm from "@/components/ResumeUploadForm";
import ResumeList from "@/components/ResumeList";
import { Job } from "@/types/job";
import CandidateApplications from "@/components/CandidateApplications";
import CandidateJobSearch from "@/components/CandidateJobSearch";
import CandidateProfileForm from "@/components/CandidateProfileForm";


import VideoInterview from "@/components/VideoInterview";
import PaymentButton from "@/components/PaymentButton";
export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [refreshResumes, setRefreshResumes] = useState(false);
  const roomId: string = "job-interview-room";
  const fetchJobs = async () => {
    const res = await fetch("/api/jobs");
    if (!res.ok) return;
    const data: Job[] = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job and Resume Board</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Job Board</h2>
        
        <JobForm onJobPosted={fetchJobs} />
        <JobListings jobs={jobs} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Resume Board</h2>
        <ResumeUploadForm onUpload={() => setRefreshResumes((prev) => !prev)} />
        <ResumeList key={refreshResumes ? "refresh-true" : "refresh-false"} />
       <CandidateApplications/>
       <CandidateJobSearch/>
       <CandidateProfileForm/>
       <VideoInterview roomId={roomId} />
       <PaymentButton/>
      </section>
    </main>
  );
}
