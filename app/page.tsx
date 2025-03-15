






/*import JobListings from "./job-listings/page";
import CandidateProfile from "@/components/CandidateProfile";

import JobForm from "@/components/JobForm";
import CandidateForm from "@/components/CandidateForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-geist-sans">
      <header className="w-full text-center text-xl font-bold">
        <h1>Hiring Platform</h1>
      </header>
      <main className="w-full max-w-4xl space-y-8">
        <JobForm />
        <CandidateForm />
        <CandidateProfile />
        <JobListings />
      </main>
      <footer className="w-full flex justify-center mt-auto">
        <p className="text-sm">&copy; 2025 Hiring Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
*/

/*"use client";

import { useEffect, useState } from "react";
import CandidateProfile from "@/components/CandidateProfile";
import CandidateForm from "@/components/CandidateForm";
import JobListings from "@/components/JobListings";
import JobForm from "@/components/JobForm";

export default function Home() {
  const [candidates, setCandidates] = useState<any[]>([]); // Ensure it's always an array

  const fetchCandidates = async () => {
    try {
      const res = await fetch("/api/candidates");
      if (!res.ok) throw new Error("Failed to fetch candidates");
      const data = await res.json();
      setCandidates(data || []); // Ensure data is an array
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setCandidates([]); // Handle errors by setting an empty array
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-geist-sans">
      <header className="w-full text-center text-xl font-bold">
        <h1>Hiring Platform</h1>
      </header>
      <main className="w-full max-w-4xl space-y-8">
        <JobForm />
        <CandidateForm onCandidateAdded={fetchCandidates} />
        <CandidateProfile candidates={candidates} />
        <JobListings />
      </main>
      <footer className="w-full flex justify-center mt-auto">
        <p className="text-sm">&copy; 2025 Hiring Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}*/


"use client";

import { useState, useEffect } from "react";
import JobForm from "@/components/JobForm";
import JobListings from "@/components/JobListings";
import { Job } from "@/types/job";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Fetch jobs from the API
  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");

      const data: Job[] = await res.json();
      setJobs(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Board</h1>

      <JobForm onJobPosted={fetchJobs} />
      <JobListings jobs={jobs} />
    </main>
  );
}
