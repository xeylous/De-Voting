import React from "react";

export default function Header({ account, connectWallet }) {
  return (
    <div className="flex justify-between items-center w-full bg-gray-800 px-6 py-4 shadow-lg">
      <h1 className="text-2xl font-bold text-white">🗳️ Decentralized Voting</h1>
      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      ) : (
        <span className="text-green-400">Connected: {account}</span>
      )}
    </div>
  );
}
