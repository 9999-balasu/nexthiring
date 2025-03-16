"use client";

import CandidateProfileForm from "@/components/CandidateProfileForm";
import CandidateJobSearch from "@/components/CandidateJobSearch";

export default function CandidatePortal() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Candidate Portal</h1>
      {/* Profile creation/update */}
      <CandidateProfileForm />
      {/* Job search and application */}
      <CandidateJobSearch />
    </div>
  );
}
