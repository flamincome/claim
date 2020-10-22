let ctx = {};
let voting = '0x1b4f5dc02a0e60422c4736d96628c3da63e1ceb5';
let claimer = '0x5AEdBAacDf054738327CAc23C47017903684CAdf';

await (async function() { ctx.voting = await IVoting.at(voting) })()
await (async function() { ctx.votesLength = parseInt((await ctx.voting.votesLength()).toString()) })()

await (async function() { return (await ctx.voting.getVote(0))['2'].toString() })()

// this will get enum VoterState { Absent, Yea, Nay }, 0 => Absent, 1 => Yea, 2 => Nay
await (async function() { return (await ctx.voting.getVoterState(0, claimer)).toString() })()

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
await (async function() { return (await ctx.voting.getVoterState(9, claimer)).toString() })()
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
