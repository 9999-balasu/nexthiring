










/*"use client";

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
       </section>
       <section>
       <CandidateApplications/>
       <CandidateJobSearch/>
       <CandidateProfileForm/>
       <section>
       </section>
       <VideoInterview roomId={roomId} />
       </section>
       <section>
       <PaymentButton/>
      </section>
    </main>
  );
}*/


/*"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import JobForm from "@/components/JobForm";
import JobListings from "@/components/JobListings";
import ResumeUploadForm from "@/components/ResumeUploadForm";
import ResumeList from "@/components/ResumeList";
import CandidateApplications from "@/components/CandidateApplications";
import CandidateJobSearch from "@/components/CandidateJobSearch";
import CandidateProfileForm from "@/components/CandidateProfileForm";
import VideoInterview from "@/components/VideoInterview";
import PaymentButton from "@/components/PaymentButton";
import { Job } from "@/types/job";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [refreshResumes, setRefreshResumes] = useState(false);
  const [activeSection, setActiveSection] = useState("jobBoard"); // Manage active section

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
    

      <h1 className="text-2xl font-bold my-4">Job and Resume Board</h1>

      {activeSection === "jobBoard" && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Job Board</h2>
          <JobForm onJobPosted={fetchJobs} />
          <JobListings jobs={jobs} />
        </section>
      )}

      {activeSection === "resumeBoard" && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Resume Board</h2>
          <ResumeUploadForm onUpload={() => setRefreshResumes((prev) => !prev)} />
          <ResumeList key={refreshResumes ? "refresh-true" : "refresh-false"} />
        </section>
      )}

      {activeSection === "candidates" && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Candidates</h2>
          <CandidateApplications />
          <CandidateJobSearch />
          <CandidateProfileForm />
        </section>
      )}

      {activeSection === "videoInterview" && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Video Interview</h2>
          <VideoInterview roomId={roomId} />
        </section>
      )}

      {activeSection === "payment" && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
          <PaymentButton />
        </section>
      )}
    </main>
  );
}*/




/*"use client";
import { useState, useEffect } from "react";
import JobForm from "@/components/JobForm";
import JobListings from "@/components/JobListings";
import ResumeUploadForm from "@/components/ResumeUploadForm";
import ResumeList from "@/components/ResumeList";
import CandidateApplications from "@/components/CandidateApplications";
import CandidateJobSearch from "@/components/CandidateJobSearch";
import CandidateProfileForm from "@/components/CandidateProfileForm";
import VideoInterview from "@/components/VideoInterview";
import PaymentButton from "@/components/PaymentButton";
import { Job } from "@/types/job";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [refreshResumes, setRefreshResumes] = useState(false);
  const [activeSection, setActiveSection] = useState("job-board"); // Default section
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

      {/* Dynamically Render Sections */
     /* {activeSection === "job-board" && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Job Board</h2>
          <JobForm onJobPosted={fetchJobs} />
          <JobListings jobs={jobs} />
        </section>
      )}

      {activeSection === "resume-board" && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Resume Board</h2>
          <ResumeUploadForm onUpload={() => setRefreshResumes((prev) => !prev)} />
          <ResumeList key={refreshResumes ? "refresh-true" : "refresh-false"} />
        </section>
      )}

      {activeSection === "applications" && <CandidateApplications />}
      {activeSection === "job-search" && <CandidateJobSearch />}
      {activeSection === "profile" && <CandidateProfileForm />}
      {activeSection === "interview" && <VideoInterview roomId={roomId} />}
      {activeSection === "payment" && <PaymentButton />}
    </main>
  );
}*/





"use client";
import { useState, useEffect } from "react";
import JobForm from "@/components/JobForm";
import JobListings from "@/components/JobListings";
import ResumeUploadForm from "@/components/ResumeUploadForm";
import ResumeList from "@/components/ResumeList";
import CandidateApplications from "@/components/CandidateApplications";
import CandidateJobSearch from "@/components/CandidateJobSearch";
import CandidateProfileForm from "@/components/CandidateProfileForm";
import VideoInterview from "@/components/VideoInterview";
import PaymentButton from "@/components/PaymentButton";
import { Job } from "@/types/job";

export default function Home({ activeSection }: { activeSection: string }) {
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

      {activeSection === "jobs" && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Job Board</h2>
          <JobForm onJobPosted={fetchJobs} />
          <JobListings jobs={jobs} />
        </section>
      )}

      {activeSection === "resumes" && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Resume Board</h2>
          <ResumeUploadForm onUpload={() => setRefreshResumes((prev) => !prev)} />
          <ResumeList key={refreshResumes ? "refresh-true" : "refresh-false"} />
        </section>
      )}

      {activeSection === "candidates" && (
        <section>
          <CandidateApplications />
          <CandidateJobSearch />
          <CandidateProfileForm />
        </section>
      )}

      {activeSection === "interview" && (
        <section>
          <VideoInterview roomId={roomId} />
        </section>
      )}

      {activeSection === "payment" && (
        <section>
          <PaymentButton />
        </section>
      )}
    </main>
  );
}
