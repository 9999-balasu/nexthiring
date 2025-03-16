/*"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect if not authenticated
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Welcome to the Dashboard</h2>
      <p>This is your protected dashboard.</p>
    </div>
  );
}*/




"use client";

import { useState } from "react";
import JobForm from "@/components/JobForm";
import JobListings from "@/components/JobListings";
import ResumeUploadForm from "@/components/ResumeUploadForm";
import ResumeList from "@/components/ResumeList";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"jobs" | "resumes">("jobs");
  const [jobs, setJobs] = useState([]);
  const [refreshResumes, setRefreshResumes] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Job and Resume Board</h1>

      {/* BUTTON CONTAINER */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
            activeTab === "jobs" ? "bg-blue-600" : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          Jobs
        </button>

        <button
          onClick={() => setActiveTab("resumes")}
          className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
            activeTab === "resumes" ? "bg-green-600" : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          Resume
        </button>
      </div>

      {/* CONDITIONAL RENDERING */}
      {activeTab === "jobs" ? (
        <div>
          <JobForm onJobPosted={fetchJobs} />
          <JobListings jobs={jobs} />
        </div>
      ) : (
        <div>
          <ResumeUploadForm onUpload={() => setRefreshResumes((prev) => !prev)} />
          <ResumeList key={refreshResumes ? "refresh-true" : "refresh-false"} />
        </div>
      )}
    </div>
  );
}

