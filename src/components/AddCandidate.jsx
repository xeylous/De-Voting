"use client";
import React, { useState } from "react";

export default function AddCandidate({ addCandidate }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    addCandidate(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
      <input
        type="text"
        placeholder="Candidate Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
      >
        Add Candidate
      </button>
    </form>
  );
}
