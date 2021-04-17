pragma solidity ^0.5.0;

import "./ChyToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    // All code goes here...
    string public name = "Chy Token Farm";

    // Creating a state variable to track the owner
    address public owner;

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

        // Keep track of owner when deploying the contract
        owner = msg.sender;
    }

    // Firstly, we will STAKE Tokens (Deposit)
    function stakeTokens(uint _amount) public {
        
        // Code goes inside here...

        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

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

    // Secondly, we will ISSUE Tokens (Earning Interest)
    function issueTokens() public {
        // only allow owner to issue token
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                chyToken.transfer(recipient, balance);
            }
        }
    }

    // Thirdly, we will UNSTAKE Tokens (Withdraw)
}