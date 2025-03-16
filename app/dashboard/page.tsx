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




/*"use client";

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

      {/* BUTTON CONTAINER */
     /* <div className="flex justify-center gap-4 mb-6">
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

      {/* CONDITIONAL RENDERING */
    /*  {activeTab === "jobs" ? (
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
*/
/*"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import JobForm from "@/components/JobForm";
import JobListings from "@/components/JobListings";
import ResumeUploadForm from "@/components/ResumeUploadForm";
import ResumeList from "@/components/ResumeList";

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"jobs" | "resumes">("jobs");
  const [jobs, setJobs] = useState([]);
  const [refreshResumes, setRefreshResumes] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const auth = localStorage.getItem("auth");
        if (auth === "true") {
          setIsAuthenticated(true);
          fetchJobs();
        } else {
          router.push("/login"); // Redirect if not authenticated
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove authentication flag
    router.push("/login"); // Redirect to login
  };

  if (!isAuthenticated) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job and Resume Board</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
            activeTab === "jobs" ? "bg-blue-600" : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          Jobs
        </button>

        <button
          onClick={() => setActiveTab("resumes")}
          className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
            activeTab === "resumes" ? "bg-green-600" : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          Resume
        </button>
      </div>

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
*/

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import JobForm from "@/components/JobForm";
import JobListings from "@/components/JobListings";
import ResumeUploadForm from "@/components/ResumeUploadForm";
import ResumeList from "@/components/ResumeList";
import CandidateApplications from "@/components/CandidateApplications"; // Import new component

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"jobs" | "resumes" | "applications">("jobs");
  const [jobs, setJobs] = useState([]);
  const [refreshResumes, setRefreshResumes] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = localStorage.getItem("auth");
      if (auth === "true") {
        setIsAuthenticated(true);
        fetchJobs();
      } else {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push("/login");
  };

  if (!isAuthenticated) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job and Resume Board</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
            activeTab === "jobs" ? "bg-blue-600" : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          Jobs
        </button>

        <button
          onClick={() => setActiveTab("resumes")}
          className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
            activeTab === "resumes" ? "bg-green-600" : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          Resumes
        </button>

        {/* Add Candidate Applications Button */}
  <button
    onClick={() => setActiveTab("applications")}
    className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
      activeTab === "applications" ? "bg-purple-600" : "bg-gray-400 hover:bg-gray-500"
    }`}
  >
    Candidate Applications
  </button>
      </div>

      {activeTab === "jobs" ? (
        <div>
          <JobForm onJobPosted={fetchJobs} />
          <JobListings jobs={jobs} />
        </div>
      ) : activeTab === "resumes" ? (
        <div>
          <ResumeUploadForm onUpload={() => setRefreshResumes((prev) => !prev)} />
          <ResumeList key={refreshResumes ? "refresh-true" : "refresh-false"} />
        </div>
      ) : (
        <CandidateApplications />
      )}
    </div>
  );
}
