/*"use client";

import { useEffect, useState } from "react";

interface Application {
  id: string;
  candidateName: string;
  jobTitle: string;
  companyName: string;
  status: string;
  appliedDate: string;
}

export default function CandidateApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/applications");
        if (!res.ok) throw new Error("Failed to fetch applications");
        const data = await res.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p className="text-center">Loading applications...</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-amber-900 font-bold mb-4">Candidate Applications</h2>
      {applications.length === 0 ? (
        <p className="text-center text-gray-600">No applications found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Candidate</th>
              <th className="p-2 border">Job Title</th>
              <th className="p-2 border">Company</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-100">
                <td className="p-2 border">{app.candidateName}</td>
                <td className="p-2 border">{app.jobTitle}</td>
                <td className="p-2 border">{app.companyName}</td>
                <td className="p-2 border font-semibold">{app.status}</td>
                <td className="p-2 border">{new Date(app.appliedDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}*/


"use client";

import { useEffect, useState } from "react";

interface Application {
  id: string;
  candidateName: string;
  jobTitle: string;
  companyName: string;
  status: string;
  appliedDate: string;
}

export default function CandidateApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/applications");
        if (!res.ok) throw new Error("Failed to fetch applications");
        const data = await res.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p className="text-center text-white">Loading applications...</p>;

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl text-amber-500 font-bold mb-4">Candidate Applications</h2>
      {applications.length === 0 ? (
        <p className="text-center text-gray-400">No applications found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-left text-white">
              <th className="p-2 border border-gray-700">Candidate</th>
              <th className="p-2 border border-gray-700">Job Title</th>
              <th className="p-2 border border-gray-700">Company</th>
              <th className="p-2 border border-gray-700">Status</th>
              <th className="p-2 border border-gray-700">Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-800">
                <td className="p-2 border border-gray-700">{app.candidateName}</td>
                <td className="p-2 border border-gray-700">{app.jobTitle}</td>
                <td className="p-2 border border-gray-700">{app.companyName}</td>
                <td className="p-2 border border-gray-700 font-semibold">{app.status}</td>
                <td className="p-2 border border-gray-700">
                  {new Date(app.appliedDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

