const DaiToken = artifacts.require('DaiToken')
const ChyToken = artifacts.require('ChyToken')
const TokenFarm = artifacts.require('TokenFarm')

// Requiring Chai which helps us to write assertions
require('chai')
    .use(require('chai-as-promised'))
    .should()

// Helper function for token amount
function tokens(n) {
    return web3.utils.toWei(n, 'Ether')
}

// To write basic tests, we use to contract keyword
contract('TokenFarm', ([owner, investor]) => {
    
    // Write tests here...
    let daiToken, chyToken, tokenFarm

    // Creating a before hook
    before(async () => {
        // Load Contracts
        daiToken = await DaiToken.new()
        chyToken = await ChyToken.new()
        tokenFarm = await TokenFarm.new(chyToken.address, daiToken.address)

        // Transfer all Chy Tokens to farm (1 million)
        await chyToken.transfer(tokenFarm.address, tokens('1000000'))

        // Send/transfer tokens to investors
        await daiToken.transfer(investor, tokens('100'), { from: owner })

    })

    // Describe the DAI token
    describe('Mock DAI deployment', async () => {
        it('has a name', async () => {
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })

    // Describe the CHY token
    describe('CHY Token deployment', async () => {
        it('has a name', async () => {
            const name = await chyToken.name()
            assert.equal(name, 'CHY Token')
        })
    })

    // Describe Token Farm deployment
    describe('Token Farm deployment', async () => {
        it('has a name', async () => {
            const name = await tokenFarm.name()
            assert.equal(name, 'Chy Token Farm')
        })
    })

    // Confirm that contract has tokens for transfer
    it('contract has tokens', async () => {
        let balance = await chyToken.balanceOf(tokenFarm.address)
        assert.equal(balance.toString(), tokens('1000000'))
    })

    // Describing Farming tokens
    describe('Farming tokens', async () => {
        it('rewards investors for staking mDai tokens', async () => {
            let result

            // Check investor balance before staking
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'Investor Mock DAI wallet balance is correct before staking')

            // Stake Mock DAI Tokens
            await daiToken.approve(tokenFarm.address, tokens('100'), { from: investor })
            await tokenFarm.stakeTokens(tokens('100'), { from: investor })

            // Check for staking result
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('0'), 'Investor Mock DAI wallet balance is correct after staking')

            // Checking that the Token Farm wallet is correct
            result = await daiToken.balanceOf(tokenFarm.address)
            assert.equal(result.toString(), tokens('100'), 'Token Farm Mock DAI wallet balance is correct after staking')

            // Checking that the staking balance is correct
            result = await tokenFarm.stakingBalance(investor)
            assert.equal(result.toString(), tokens('100'), 'Investor staking balance is correct after staking')

            // Checking status of the staking balance
            result = await tokenFarm.isStaking(investor)
            assert.equal(result.toString(), 'true', 'Investor staking status is correct after staking')
        })
    })

})