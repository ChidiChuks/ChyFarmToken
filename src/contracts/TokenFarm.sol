pragma solidity ^0.5.0;

import "./ChyToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    // All code goes here...
    string public name = "Chy Token Farm";
    ChyToken public chyToken;
    DaiToken public daiToken;

    // Creating an array that keeps track of all addresses that has been staked
    address[] public stakers;

    // Key value store; Datastructure (MAPPING)
    mapping(address => uint) public stakingBalance;
    
    // mapping for checking if a user has staked before 
    mapping(address => bool) public hasStaked;

    // mapping for current staking status
    mapping(address => bool) public isStaking;

    constructor(ChyToken _chyToken, DaiToken _daiToken) public {
        chyToken = _chyToken;
        daiToken = _daiToken;
    }

    // Firstly, we will STAKE Tokens (Deposit)
    function stakeTokens(uint _amount) public {
        // Code goes inside here...

        // Transfer Mock DAI tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array *only if they haven't staked already*
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Updating staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

    }

    // Secondly, we will UNSTAKE Tokens (Withdraw)

    // Thirdly, we will ISSUE Tokens (Earning Interest)
}