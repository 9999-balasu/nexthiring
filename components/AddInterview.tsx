"use client";

import { useState } from "react";

const AddInterview = () => {
  const [candidateName, setCandidateName] = useState("");
  const [recruiterName, setRecruiterName] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName,
          recruiterName,
          scheduledTime,
          status: "Scheduled",
          meetingLink,
        }),
      });

      if (!res.ok) throw new Error("Failed to schedule interview");

      alert("Interview added successfully!");
      setCandidateName("");
      setRecruiterName("");
      setScheduledTime("");
      setMeetingLink("");
    } catch (error) {
      console.error("Error adding interview:", error);
      alert("Error scheduling interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-3">Schedule Interview</h2>

      <input
        type="text"
        placeholder="Candidate Name"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
        required
        className="w-full p-2 border rounded mb-2"
      />

      <input
        type="text"
        placeholder="Recruiter Name"
        value={recruiterName}
        onChange={(e) => setRecruiterName(e.target.value)}
        required
        className="w-full p-2 border rounded mb-2"
      />

      <input
        type="datetime-local"
        value={scheduledTime}
        onChange={(e) => setScheduledTime(e.target.value)}
        required
        className="w-full p-2 border rounded mb-2"
      />

      <input
        type="url"
        placeholder="Meeting Link (Google Meet/Zoom)"
        value={meetingLink}
        onChange={(e) => setMeetingLink(e.target.value)}
        required
        className="w-full p-2 border rounded mb-2"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-lg"
        disabled={loading}
      >
        {loading ? "Scheduling..." : "Schedule Interview"}
      </button>
    </form>
  );
};

export default AddInterview;
