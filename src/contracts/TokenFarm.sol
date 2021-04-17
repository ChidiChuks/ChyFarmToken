pragma solidity ^0.5.0;

import "./ChyToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    // All code goes here...
    string public name = "Chy Token Farm";
    ChyToken public chyToken;
    DaiToken public daiToken;

    constructor(ChyToken _chyToken, DaiToken _daiToken) public {
        chyToken = _chyToken;
        daiToken = _daiToken;
    }
}