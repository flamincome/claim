let ctx = {};
let voting = '0x1b4f5dc02a0e60422c4736d96628c3da63e1ceb5';
let claimer = '0x5AEdBAacDf054738327CAc23C47017903684CAdf';

await (async function() { ctx.voting = await IVoting.at(voting) })()
await (async function() { ctx.votesLength = parseInt((await ctx.voting.votesLength()).toString()) })()

await (async function() { ctx.claim = await FlamincomeClaim.new() })()
await (async function() { await ctx.claim.setTotalSupply(new web3.utils.BN('1000000000000000000000')) })()
await (async function() { return (await ctx.claim.totalSupply()).toString() })()

await (async function() { await ctx.claim.setVotingAddress(voting) })()
await (async function() { return (await ctx.claim.voting()) })()
await (async function() { await ctx.claim.setCreateDate(new web3.utils.BN(1602247965)) })()
await (async function() { return (await ctx.claim.createDate()).toString() })()

await (async function() { return (await ctx.claim.claimAtAvailable(new web3.utils.BN(19), claimer)) })()

await (async function() { return (await ctx.claim.claimSomeAvailable([new web3.utils.BN(19)], claimer)) })()

await (async function() { return (await ctx.claim.claimed(new web3.utils.BN(19), claimer)) })()

await (async function() { return (await ctx.claim.claimAt(new web3.utils.BN(19), claimer)) })()

await (async function() { return (await ctx.voting.getVote(0))['2'].toString() })()

// this will get enum VoterState { Absent, Yea, Nay }, 0 => Absent, 1 => Yea, 2 => Nay
await (async function() { return (await ctx.voting.getVoterState(15, claimer)).toString() })() // 1
await (async function() { return (await ctx.voting.getVoterState(16, claimer)).toString() })() // 1
await (async function() { return (await ctx.voting.getVoterState(17, claimer)).toString() })() // 1
await (async function() { return (await ctx.voting.getVoterState(18, claimer)).toString() })() // 0
await (async function() { return (await ctx.voting.getVoterState(19, claimer)).toString() })() // 1
await (async function() { return (await ctx.voting.getVoterState(20, claimer)).toString() })() // 2
await (async function() { return (await ctx.voting.getVoterState(31, claimer)).toString() })() // 1
await (async function() { return (await ctx.voting.getVoterState(33, claimer)).toString() })() // 1
await (async function() { return (await ctx.voting.getVoterState(37, claimer)).toString() })() // 1

await (async function() { return (await ctx.claim.parseVote(15)) })() // (true, 1602338864, 7345481, 3000000000000000000, 0)
await (async function() { return (await ctx.claim.parseVote(16)) })() // (true, 1602339014, 7345491, 3000000000000000000, 0)
await (async function() { return (await ctx.claim.parseVote(17)) })() // (true, 1602339225, 7345505, 3000000000000000000, 0)
await (async function() { return (await ctx.claim.parseVote(18)) })() // (false, 1602339390, 7345516, 0, 0)
await (async function() { return (await ctx.claim.parseVote(19)) })() // (true, 1602339706, 7345537, 3000000000000000000, 0)
await (async function() { return (await ctx.claim.parseVote(20)) })() // (false, 1602339796, 7345543, 0, 3000000000000000000)
await (async function() { return (await ctx.claim.parseVote(31)) })() // (true, 1602668717, 7367450, 113000000000000000001, 0)
await (async function() { return (await ctx.claim.parseVote(33)) })() // (true, 1603073433, 7394415, 103000000000000000003, 0)
await (async function() { return (await ctx.claim.parseVote(37)) })() // (true, 1603264967, 7407181, 103000000000000000005, 0)

await (async function() { return (await ctx.claim.isVoteOpen(1602338864, true)) })() // false
await (async function() { return (await ctx.claim.isVoteOpen(1602339014, true)) })() // false
await (async function() { return (await ctx.claim.isVoteOpen(1602339225, true)) })() // false
await (async function() { return (await ctx.claim.isVoteOpen(1602339390, false)) })() // false
await (async function() { return (await ctx.claim.isVoteOpen(1602339706, true)) })() // false
await (async function() { return (await ctx.claim.isVoteOpen(1602339796, false)) })() // false
await (async function() { return (await ctx.claim.isVoteOpen(1602668717, true)) })() // false
await (async function() { return (await ctx.claim.isVoteOpen(1603073433, true)) })() // false
await (async function() { return (await ctx.claim.isVoteOpen(1603264967, true)) })() // false

await (async function() { return (await ctx.claim.getVoteGap(new web3.utils.BN(15))).toString() })() // 150
await (async function() { return (await ctx.claim.getVoteGap(new web3.utils.BN(16))).toString() })() // 150
await (async function() { return (await ctx.claim.getVoteGap(new web3.utils.BN(17))).toString() })() // 211
await (async function() { return (await ctx.claim.getVoteGap(new web3.utils.BN(18))).toString() })() // 165
await (async function() { return (await ctx.claim.getVoteGap(new web3.utils.BN(19))).toString() })() // 316
await (async function() { return (await ctx.claim.getVoteGap(new web3.utils.BN(20))).toString() })() // 90
await (async function() { return (await ctx.claim.getVoteGap(new web3.utils.BN(31))).toString() })() // 176292
await (async function() { return (await ctx.claim.getVoteGap(new web3.utils.BN(33))).toString() })() // 241349
await (async function() { return (await ctx.claim.getVoteGap(new web3.utils.BN(37))).toString() })() // 93584

await (async function() { return (await ctx.claim.getStake(claimer, 7345481)).toString() })() // 3000000000000000000
await (async function() { return (await ctx.claim.getStake(claimer, 7345491)).toString() })() // 3000000000000000000
await (async function() { return (await ctx.claim.getStake(claimer, 7345505)).toString() })() // 3000000000000000000
await (async function() { return (await ctx.claim.getStake(claimer, 7345516)).toString() })() // 3000000000000000000
await (async function() { return (await ctx.claim.getStake(claimer, 7345537)).toString() })() // 3000000000000000000
await (async function() { return (await ctx.claim.getStake(claimer, 7345543)).toString() })() // 3000000000000000000
await (async function() { return (await ctx.claim.getStake(claimer, 7367450)).toString() })() // 102999999999999999996
await (async function() { return (await ctx.claim.getStake(claimer, 7394415)).toString() })() // 102999999999999999996
await (async function() { return (await ctx.claim.getStake(claimer, 7407181)).toString() })() // 102999999999999999994

await (async function() { return (await ctx.claim.claimAtAvailable(new web3.utils.BN(15), claimer)) })() // 4756468797564687
await (async function() { return (await ctx.claim.claimAtAvailable(new web3.utils.BN(16), claimer)) })() // 4756468797564687
await (async function() { return (await ctx.claim.claimAtAvailable(new web3.utils.BN(17), claimer)) })() // 6690766108574327
await (async function() { return (await ctx.claim.claimAtAvailable(new web3.utils.BN(18), claimer)) })() // 0
await (async function() { return (await ctx.claim.claimAtAvailable(new web3.utils.BN(19), claimer)) })() // 10020294266869609
await (async function() { return (await ctx.claim.claimAtAvailable(new web3.utils.BN(20), claimer)) })() // 2853881278538812
await (async function() { return (await ctx.claim.claimAtAvailable(new web3.utils.BN(31), claimer)) })() // 5095476219339717945
await (async function() { return (await ctx.claim.claimAtAvailable(new web3.utils.BN(33), claimer)) })() // 7653126585489599187
await (async function() { return (await ctx.claim.claimAtAvailable(new web3.utils.BN(37), claimer)) })() // 2967529173008625063

let voteIds = [new web3.utils.BN(15), new web3.utils.BN(16), new web3.utils.BN(17), new web3.utils.BN(18), new web3.utils.BN(19), new web3.utils.BN(20), new web3.utils.BN(31), new web3.utils.BN(33), new web3.utils.BN(37)]

await (async function() { return (await ctx.claim.claimSomeAvailable(voteIds, claimer)) })()

/***************************************************************************************************************/

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

async function checkVote(elem, idx) {
    let state = await (async function() { return (await ctx.voting.getVoterState(elem, claimer)).toString() })()
    console.log(`vote${elem} => ${state}`)
}

let voteIds = []

for (var i=0; i<ctx.votesLength; i++) { 
    voteIds.append(i)
}

console.log(voteIds)

await (async function() { await asyncForEach(voteIds, checkVote) })()

for (var i = 0; i < 38; i++) {
    console.log(`await (async function() { return (await ctx.voting.getVoterState(${i}, claimer)).toString() })()`)
}

await (async function() { return (await ctx.voting.getVoterState(0, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(1, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(2, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(3, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(4, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(5, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(6, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(7, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(8, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(new web.utils.BN(9), claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(10, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(11, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(12, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(13, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(14, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(15, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(16, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(17, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(18, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(19, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(20, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(21, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(22, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(23, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(24, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(25, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(26, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(27, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(28, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(29, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(30, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(31, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(32, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(33, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(34, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(35, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(36, claimer)).toString() })()
await (async function() { return (await ctx.voting.getVoterState(37, claimer)).toString() })()

