// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

import "./interfaces/Aragon.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/GSN/Context.sol";
import "@aragon/os/contracts/common/Uint256Helpers.sol";

contract FlamincomeClaim {
    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;
    using SafeMath for uint64;

    uint64 public createDate;
    uint64 public oneYear; // stands for duration for one year as seconds
    uint64 public totalSupply; // totalSupply of rewards token for one year
    IERC20 public claimToken;
    IVoting public voting;

    address public governance;

    // voteId => (claimer address => claimed status)
    mapping(uint256 => mapping(address => bool)) public claimed;

    event AlreadyClaimed(uint256 indexed voteId, address indexed claimer);
    event VoteStillOpen(uint256 indexed voteId, address indexed claimer);
    event VoterStateInvalid(uint256 indexed voteId, address indexed claimer);

    constructor(uint64 _createDate, address _tokenAddress, address _votingAddress) public {
        createDate = _createDate;
        claimToken = IERC20(_tokenAddress);
        voting = IVoting(_voteAddress);
        oneYear = 31536000; // 365 * 24 * 3600
    }

    function setTokenAddress(address _tokenAddress) public {
        require(msg.sender == governance, "!governance");
        claimToken = IERC20(_tokenAddress);
    }

    function setVotingAddress(address _votingAddress) public {
        require(msg.sender == governance, "!governance");
        voting = IVoting(_voteAddress);
    }

    function _isVoteOpen(uint64 startDate, bool executed) internal view returns (bool) {
        return getTimestamp64() < startDate.add(voting.voteTime) && !executed;
    }

    function claimAt(uint256 _voteId) public {
        uint256 _voteIds[] = [_voteId];
        claimSome(_voteIds);
    }

    function claimSome(uint256[] _voteIds) public {
        address _claimer = msg.sender;
        uint256 _totalRewards = 0;

        for (uint i = 0; i < _voteIds.length; i++) {
            _voteId = _voteIds[i]

            if (claimed[_voteId][_claimer]) {
                emit AlreadyClaimed(_voteId, _claimer);
                continue;
            }

            (bool open,
             bool executed,
             uint64 startDate,
             uint64 snapshotBlock,
             uint64 supportRequired,
             uint64 minAcceptQuorum,
             uint256 yea,
             uint256 nay,
             uint256 votingPower,
             bytes memory script) = voting.getVote(_voteId);

            uint64 _voteGap = startDate - createDate;

            if (_voteId > 0) {
                (bool prevOpen,
                 bool prevExecuted,
                 uint64 prevStartDate,
                 uint64 prevSnapshotBlock,
                 uint64 prevSupportRequired,
                 uint64 prevMinAcceptQuorum,
                 uint256 prevYea,
                 uint256 prevNay,
                 uint256 prevVotingPower,
                 bytes memory prevScript) = voting.getVote(_voteId - 1);

                _voteGap = startDate - prevStartDate;
            }

            if (!_isVoteOpen()) {
                VoterState state = voting.getVoterState(_voteId, _claimer);
                if (state == VoterState.Absent) {
                    emit VoterStateInvalid(_voteId, _claimer);
                    return;
                }

                uint256 _stake = voting.token.balanceOfAt(_claimer, snapshotBlock);
                uint256 _rewards = (_stake.div(yea.add(nay))).mul(_voteGap.div(oneYear)).mul(totalSupply);
                _totalRewards.add(rewards);
                claimed[_voteId][_claimer] = true;
            } else {
                emit VoteStillOpen(_voteId, _claimer);
            }
        }

        claimToken.safeTransfer(_claimer, _totalRewards);
    }

    function claimAll() public {
        uint256 _voteIds[voting.votesLength];

        for (uint i = 0; i < voting.votesLength; i++) {
            _voteIds[i] = i;
        }

        claimSome(_voteIds);
    }
}
