// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    address public owner;
    mapping(address => bool) public hasVoted;
    Candidate[] public candidates;

    constructor() {
        owner = msg.sender; // whoever deploys is admin
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // Add candidates anytime (only owner)
    function addCandidate(string memory name) public onlyOwner {
        candidates.push(Candidate(name, 0));
    }

    // Vote only once
    function vote(uint candidateIndex) public {
        require(!hasVoted[msg.sender], "You have already voted!");
        require(candidateIndex < candidates.length, "Invalid candidate index");

        candidates[candidateIndex].voteCount += 1;
        hasVoted[msg.sender] = true;
    }

    // Get all candidates with votes
    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
}
