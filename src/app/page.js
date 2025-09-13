'use client';
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../utils/contractConfig";
import AddCandidate from "../components/AddCandidate";


import Header from "../components/Header";
import CandidateList from "../components/CandidateList";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [candidates, setCandidates] = useState([]);

  // Connect Wallet
  async function connectWallet() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      loadCandidates();
    } else {
      alert("Please install MetaMask!");
    }
  }

  // Add candidate function
async function addCandidate(name) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  try {
    const tx = await contract.addCandidate(name);
    await tx.wait();
    alert(`✅ Candidate "${name}" added!`);
    loadCandidates();
  } catch (err) {
    alert(err.reason || "Error adding candidate");
  }
}

  // Load Candidates
  async function loadCandidates() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const data = await contract.getCandidates();
    setCandidates(data);
  }

  // Vote
  async function vote(index) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    try {
      const tx = await contract.vote(index);
      await tx.wait();
      alert("✅ Vote submitted!");
      loadCandidates(); // refresh results
    } catch (err) {
      alert(err.reason || "Error voting");
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      loadCandidates();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header account={account} connectWallet={connectWallet} />
      <main className="flex flex-col items-center p-6">
  <CandidateList candidates={candidates} vote={vote} />

  {/* Only show to contract owner */}
  {account?.toLowerCase() === "0xYourOwnerAddress".toLowerCase() && (
    <AddCandidate addCandidate={addCandidate} />
  )}
</main>

    </div>
  );
}
