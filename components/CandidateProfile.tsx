

/*"use client";

import { useEffect, useState } from "react";

export default function CandidateProfile() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch("/api/candidates")
      .then((res) => res.json())
      .then((data) => setCandidates(data));
  }, []);

  return (
    <div className="border rounded-lg p-6 shadow-md w-full">
      <h2 className="text-2xl font-bold mb-4">Candidate Profiles</h2>
      {candidates.length > 0 ? (
        candidates.map((candidate: any) => (
          <div key={candidate._id} className="border-b py-4">
            <h3 className="text-lg font-semibold">{candidate.name}</h3>
            <p className="text-gray-600">Email: {candidate.email}</p>
            <p>Experience: {candidate.experience} years</p>
            <p>Skills: {candidate.skills.join(", ")}</p>
          </div>
        ))
      ) : (
        <p>No candidates available.</p>
      )}
    </div>
  );
}*/



/*export default function CandidateProfile({ candidates }: { candidates: any[] }) {
    return (
      <div className="border rounded-lg p-6 shadow-md w-full">
        <h2 className="text-2xl font-bold mb-4">Candidate Profiles</h2>
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <div key={candidate._id} className="border-b py-4">
              <h3 className="text-lg font-semibold">{candidate.name}</h3>
              <p className="text-gray-600">Email: {candidate.email}</p>
              <p>Experience: {candidate.experience} years</p>
              <p>Skills: {candidate.skills.join(", ")}</p>
            </div>
          ))
        ) : (
          <p>No candidates available.</p>
        )}
      </div>
    );
  }*/


    interface Candidate {
        _id: string;
        name: string;
        email: string;
        experience: number;
        skills: string[];
      }
      
      export default function CandidateProfile({ candidates }: { candidates: Candidate[] }) {
        return (
          <div className="border rounded-lg p-6 shadow-md w-full">
            <h2 className="text-2xl font-bold mb-4">Candidate Profiles</h2>
            {candidates.length > 0 ? (
              candidates.map((candidate) => (
                <div key={candidate._id} className="border-b py-4">
                  <h3 className="text-lg font-semibold">{candidate.name}</h3>
                  <p className="text-gray-600">Email: {candidate.email}</p>
                  <p>Experience: {candidate.experience} years</p>
                  <p>Skills: {candidate.skills.join(", ")}</p>
                </div>
              ))
            ) : (
              <p>No candidates available.</p>
            )}
          </div>
        );
      }
      
  
