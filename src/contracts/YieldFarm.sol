pragma solidity >=0.4.21 < 0.9.0;


import "./CeloDollar.sol";
import "./UbeswapClone.sol";

contract YieldFrams{
    string public name="Fram";
    address public owner;
    UbeswapClone public ubeswapClone;
    CeloDollar public cUSDToken;

    address[] public stakers;
    mapping(address=> uint) public stakingBalance;
    mapping(address=>bool)public hasStaked;
    mapping(address=>bool)public isStaking;

    constructor(UbeswapClone _ubeswapClone, CeloDollar _cUSDToken) public {
        ubeswapClone = _ubeswapClone;
        cUSDToken = _cUSDToken;
        owner = msg.sender;
    }
    //staking tokens cUSD
    function stakeTokens(uint _amount)public{
        //require amount greater than 0
        require(_amount >0,"amount cannot be 0");
        //transfer cusd to this contract for staking
        cUSDToken.transferFrom(msg.sender,address(this),_amount);
        //updating staking balance
        stakingBalance[msg.sender]=stakingBalance[msg.sender]+_amount;
        //Add user to stakers array only if they haven't stake already
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }
        //update staking status
        isStaking [msg.sender]=true;
        hasStaked[msg.sender]=true;
    }
    
    // ustaking tokens cUSD (withdraw)
    function unstakeToken()public{
        //fetch staking balance
        uint balance=stakingBalance[msg.sender];
        //require amount  greater than 0
        require(balance >0 ,"staking balance cannot be 0");
        //transfer cUSD tokens to this contract for staking
        cUSDToken.transfer(msg.sender,balance);
        //Reset staking balance
        stakingBalance[msg.sender]=0;
        //update staking status
        isStaking[msg.sender]=false;
    }

    //issuing tokens (ubswap)
    function issueToken()public{
        //only owner can call this function
        require(msg.sender == owner,"caller must be the the owner");
        //Issue tokens to all stakers
        for (uint i=0;i<stakers.length;i++){
            address recipient =stakers[i];
            uint balance=stakingBalance[recipient];
            if(balance >0){
                ubeswapClone.transfer(recipient, balance);
            }
        }
    }

}