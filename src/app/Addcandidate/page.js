"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../utils/contractConfig";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [owner, setOwner] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState("");

  useEffect(() => {
    loadBlockchainData();
  }, [account]);

  async function loadBlockchainData() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const acc = await signer.getAddress();
      setAccount(acc);

      // ✅ fetch owner from contract
      const contractOwner = await contract.owner();
      setOwner(contractOwner);

      // ✅ check if current user == owner
      setIsOwner(acc.toLowerCase() === contractOwner.toLowerCase());

      // ✅ load candidates
      const candidatesList = await contract.getCandidates();
      setCandidates(candidatesList);
    }
  }

  async function addCandidate() {
    if (!isOwner) {
      alert("Only owner can add candidates!");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const tx = await contract.addCandidate(newCandidate);
    await tx.wait();
    setNewCandidate("");
    loadBlockchainData();
  }

  async function vote(index) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const tx = await contract.vote(index);
    await tx.wait();
    loadBlockchainData();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900">
      <h1 className="text-3xl font-bold mb-4">Decentralized Voting DApp</h1>
      <p className="mb-2">Connected Account: {account}</p>
      <p className="mb-6">Contract Owner: {owner}</p>

      {/* ✅ Only owner sees Add Candidate */}
      {isOwner && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter candidate name"
            value={newCandidate}
            onChange={(e) => setNewCandidate(e.target.value)}
            className="border px-3 py-2 mr-2"
          />
          <button
            onClick={addCandidate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Candidate
          </button>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Candidates</h2>
      <ul className="space-y-2">
        {candidates.map((c, i) => (
          <li key={i} className="flex justify-between items-center bg-white p-4 rounded shadow">
            <span>{c.name} — Votes: {c.voteCount.toString()}</span>
            <button
              onClick={() => vote(i)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Vote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
