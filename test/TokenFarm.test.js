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

})