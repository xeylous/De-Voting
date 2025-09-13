import React from "react";
import CandidateCard from "./CandidateCard";

export default function CandidateList({ candidates, vote }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {candidates.map((cand, index) => (
        <CandidateCard
          key={index}
          candidate={cand}
          index={index}
          vote={vote}
        />
      ))}
    </div>
  );
}
