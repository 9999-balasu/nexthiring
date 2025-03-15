import { connectToDB } from "@/lib/mongodb";
import Candidate from "@/models/Candidate";

interface CandidateType {
  _id: string;
  name: string;
  email: string;
  skills: string[];
}

export default async function CandidateProfiles() {
  await connectToDB();
  const candidates: CandidateType[] = await Candidate.find({}).lean<CandidateType[]>();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Candidate Profiles</h1>
      {candidates.length > 0 ? (
        candidates.map((candidate) => (
          <div key={candidate._id} className="border p-4 mb-4">
            <h2 className="text-xl font-semibold">{candidate.name}</h2>
            <p>{candidate.email}</p>
            <p className="text-gray-500">Skills: {candidate.skills.join(", ")}</p>
          </div>
        ))
      ) : (
        <p>No candidates available.</p>
      )}
    </div>
  );
}
