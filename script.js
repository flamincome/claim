await (async function() { ctx.voting = await IVoting.at('0x1b4f5dc02a0e60422c4736d96628c3da63e1ceb5') })()
await (async function() { return (await ctx.voting.votesLength()).toString() })()
