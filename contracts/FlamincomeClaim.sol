// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

import "./interfaces/Aragon.sol";
import "./common/TimeHelpers.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/GSN/Context.sol";

contract FlamincomeClaim is TimeHelpers {
    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;
    using SafeMath for uint64;

    uint64 public createDate;
    uint256 public oneYear; // stands for duration for one year as seconds
    uint256 public totalSupply; // totalSupply of rewards token for one year
    IERC20 public claimToken;
    IVoting public voting;

    address public governance;

    // voteId => (claimer address => claimed status)
    mapping(uint256 => mapping(address => bool)) public claimed;

    event AlreadyClaimed(uint256 indexed voteId, address indexed claimer);
    event VoteStillOpen(uint256 indexed voteId, address indexed claimer);
    event VoterStateInvalid(uint256 indexed voteId, address indexed claimer);

    // Avoiding CompilerError: Stack too deep, try removing local variables.
    struct SimpleVote {
        bool executed;
        uint64 startDate;
        uint64 snapshotBlock;
        uint256 yea;
        uint256 nay;
    }

    constructor() public {
        governance = msg.sender;
        oneYear = 31536000; // 365 * 24 * 3600
    }

    function setGovernance(address _governance) public {
        require(msg.sender == governance, "!governance");
        governance = _governance;
    }

    function setCreateDate(uint64 _createDate) public {
        require(msg.sender == governance, "!governance");
        createDate = _createDate;
    }

    function setTokenAddress(address _tokenAddress) public {
        require(msg.sender == governance, "!governance");
        claimToken = IERC20(_tokenAddress);
    }

    function setVotingAddress(address _votingAddress) public {
        require(msg.sender == governance, "!governance");
        voting = IVoting(_votingAddress);
    }

    function _isVoteOpen(uint64 startDate, bool executed) internal view returns (bool) {
        return getTimestamp64() < startDate.add(voting.voteTime()) && !executed;
    }

    function _parseVote(uint256 _voteId) internal view returns (SimpleVote memory simpleVote) {
        (/*bool open*/,
         bool executed,
         uint64 startDate,
         uint64 snapshotBlock,
         /*uint64 supportRequired*/,
         /*uint64 minAcceptQuorum*/,
         uint256 yea,
         uint256 nay,
         /*uint256 votingPower*/,
         /*bytes memory script*/) = voting.getVote(_voteId);

        simpleVote = SimpleVote({
            executed: executed,
            startDate: startDate,
            snapshotBlock: snapshotBlock,
            yea: yea,
            nay: nay
        });
    }

    function claimAt(uint256 _voteId) public {
        uint256[] memory _voteIds = new uint256[](1);
        _voteIds[0] = _voteId;
        claimSome(_voteIds);
    }

    function claimSome(uint256[] memory _voteIds) public {
        address _claimer = msg.sender;
        uint256 _totalRewards = 0;

        for (uint i = 0; i < _voteIds.length; i++) {
            uint256 _voteId = _voteIds[i];

            if (claimed[_voteId][_claimer]) {
                emit AlreadyClaimed(_voteId, _claimer);
                continue;
            }

            SimpleVote memory _currentVote = _parseVote(_voteId);

            uint256 _voteGap = _currentVote.startDate.sub(createDate);

            if (_voteId > 0) {
                uint256 _prevVoteId = _voteId.sub(1);

                SimpleVote memory _prevVote = _parseVote(_prevVoteId);

                // the gap between current vote and previous vote
                _voteGap = _currentVote.startDate.sub(_prevVote.startDate);
            }

            if (!_isVoteOpen(_currentVote.startDate, _currentVote.executed)) {
                IVoting.VoterState state = voting.getVoterState(_voteId, _claimer);
                if (state == IVoting.VoterState.Absent) {
                    emit VoterStateInvalid(_voteId, _claimer);
                    return;
                }

                // how many votes claimer staked for current vote
                uint256 _stake = voting.token().balanceOfAt(_claimer, _currentVote.snapshotBlock);
                //               _stake       _voteGap
                // _rewards = ------------ * ---------- * totalSupply
                //             yea + nay      oneYear
                uint256 _rewards = (_stake.div(_currentVote.yea.add(_currentVote.nay))).mul(_voteGap.div(oneYear)).mul(totalSupply);
                _totalRewards.add(_rewards);
                claimed[_voteId][_claimer] = true;
            } else {
                emit VoteStillOpen(_voteId, _claimer);
            }
        }

        claimToken.safeTransfer(_claimer, _totalRewards);
    }

    function claimAll() public {
        uint256[] memory _voteIds = new uint256[](voting.votesLength());

        for (uint i = 0; i < voting.votesLength(); i++) {
            _voteIds[i] = i;
        }

        claimSome(_voteIds);
    }
}
