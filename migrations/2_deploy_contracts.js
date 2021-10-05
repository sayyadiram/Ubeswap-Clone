const CeloDollar = artifacts.require("CeloDollar");
const UbeswapClone = artifacts.require("UbeswapClone");

module.exports = async function(deployer, network, accounts) {
    //  deploy CeloDollar 
    await deployer.deploy(CeloDollar)
    // const cUSDToken = await CeloDollar.deployed()

    //  deploy Ubeswap  clone
    await deployer.deploy(UbeswapClone)
    // const UBCToken = await UbeswapClone.deployed
}