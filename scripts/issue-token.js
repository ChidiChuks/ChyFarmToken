const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(callback) {

    // code goes here...
    let tokenFarm = await TokenFarm.deployed()
    await tokenFarm.issueTokens()

    console.log("Tokens issued!")

    callback()

    // // Deploy Mock DAI Token
    // await deployer.deploy(DaiToken)
    // const daiToken = await DaiToken.deployed()

    // // Deploy Chy Token
    // await deployer.deploy(ChyToken)
    // const chyToken = await ChyToken.deployed()

    // // Deploy TokenFarm
    // await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
    // const tokenFarm = await TokenFarm.deployed()

    // // Transfer all tokens to TokenFarm (1 million)
    // await chyToken.transfer(tokenFarm.address, '1000000000000000000000000')

    // // Transfer 100 Mock DAI tokens to investor
    // await daiToken.transfer(accounts[1], '100000000000000000000')
}