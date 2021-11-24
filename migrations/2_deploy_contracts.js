const CeloDollar = artifacts.require("CeloDollar");
const UbeswapClone = artifacts.require("UbeswapClone");
const YieldFram =artifacts.require("YieldFarm")

module.exports = async function(deployer, network, accounts) {
    //  deploy CeloDollar 
    
    await deployer.deploy(CeloDollar)
    
    const cUSDToken = await CeloDollar.deployed()
    console("cUSD data",cUSDToken)    

    //  deploy Ubeswap  clone
    await deployer.deploy(UbeswapClone)
     const UbClone = await UbeswapClone.deployed()
     console("data .",UbeswapClone.address)

     await deployer.deploy(YieldFram,cUSDToken.address,UbeswapClone.address)
     const YieldFarm= await YieldFarm.deployed;
    
     await UbClone.transfer(YieldFarm.address,'10000000')
     await USDToken.transfer("0x080B7D54170c753d56972753c8d5683A55ACe95f",'100000')

}