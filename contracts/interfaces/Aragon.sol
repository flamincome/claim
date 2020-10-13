// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

// https://github.com/aragon/minime/blob/master/contracts/MiniMeToken.sol
interface IMiniMeToken {
    function balanceOfAt(address, uint) external view returns (uint);
}

// https://github.com/aragon/aragon-apps/blob/master/apps/voting/contracts/Voting.sol
interface IVoting {
    function token() external view returns (IMiniMeToken);
    function voteTime() external view returns (uint64);
    function votesLength() external view returns (uint256);

    enum VoterState { Absent, Yea, Nay }

    struct Vote {
        bool executed;
        uint64 startDate;
        uint64 snapshotBlock;
        uint64 supportRequiredPct;
        uint64 minAcceptQuorumPct;
        uint256 yea;
        uint256 nay;
        uint256 votingPower;
        bytes executionScript;
        mapping (address => VoterState) voters;
    }

    function getVote(uint256)
        external
        view
        returns (
            bool open,
            bool executed,
            uint64 startDate,
            uint64 snapshotBlock,
            uint64 supportRequired,
            uint64 minAcceptQuorum,
            uint256 yea,
            uint256 nay,
            uint256 votingPower,
            bytes memory script
        );

    function getVoterState(uint256, address) external view returns (VoterState);
}
