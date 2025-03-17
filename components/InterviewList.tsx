"use client";

import { useEffect, useState } from "react";

interface Interview {
  _id: string;
  candidateName: string;
  recruiterName: string;
  scheduledTime: string;
  status: string;
  meetingLink?: string;
}

const InterviewList = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await fetch("/api/interviews");
        if (!res.ok) throw new Error("Failed to fetch interviews");
        const data = await res.json();
        setInterviews(data);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const handleStartCall = (meetingLink?: string) => {
    if (!meetingLink) {
      alert("No meeting link available.");
      return;
    }
    window.open(meetingLink, "_blank"); // Open meeting in a new tab
  };

  if (loading) return <p className="text-center text-lg">Loading interviews...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Scheduled Interviews</h2>

      {interviews.length === 0 ? (
        <p className="text-center text-gray-500">No interviews scheduled.</p>
      ) : (
        <ul className="space-y-4">
          {interviews.map((interview) => (
            <li key={interview._id} className="border p-4 rounded-lg shadow-md">
              <p><strong>Candidate:</strong> {interview.candidateName}</p>
              <p><strong>Recruiter:</strong> {interview.recruiterName}</p>
              <p><strong>Time:</strong> {new Date(interview.scheduledTime).toLocaleString()}</p>
              <p><strong>Status:</strong> {interview.status}</p>

              {interview.meetingLink ? (
                <button
                  onClick={() => handleStartCall(interview.meetingLink)}
                  className="mt-2 px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition"
                >
                  Start Call
                </button>
              ) : (
                <p className="text-gray-500 mt-2">No meeting link available</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InterviewList;
