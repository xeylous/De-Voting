import React from "react";

export default function CandidateCard({ candidate, index, vote }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold">{candidate.name}</h2>
      <p className="text-gray-400">Votes: {candidate.voteCount.toString()}</p>
      <button
        onClick={() => vote(index)}
        className="mt-2 bg-green-600 px-3 py-1 rounded hover:bg-green-700"
      >
        Vote
      </button>
    </div>
  );
}
